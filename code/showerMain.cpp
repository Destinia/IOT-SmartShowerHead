#include "mraa.hpp"

#include <iostream>
#include <unistd.h>
#include <string>
#include <sstream>
#include <math.h>
#include <stdlib.h>
#include <unistd.h>

#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#include "grove.h"
#include "jhd1313m1.h"

using namespace std;
using namespace mraa;

int flowCounter = 0;
Gpio* flowSensor = NULL;
Aio* tempSensor = NULL;
upm::Jhd1313m1* lcd = NULL;

void incrementCounter(void* args) {
	flowCounter++;
	cout << flowCounter << endl;
}
bool platformSetup() {
	mraa_platform_t platform = mraa_get_platform_type();
	if ((platform != MRAA_INTEL_GALILEO_GEN1) &&
			(platform != MRAA_INTEL_GALILEO_GEN2) &&
			(platform != MRAA_INTEL_EDISON_FAB_C)) {
		std::cerr << "Unsupported platform, exiting" << std::endl;
		return false;
	}
	return true;
}
bool flowSensorSetup() {
	Gpio* d_pin = new Gpio(3);
	if (d_pin == NULL) {
		std::cerr << "Can't create mraa::Gpio object, exiting" << std::endl;
		return false;
	}
	if (d_pin->dir(mraa::DIR_IN) != MRAA_SUCCESS) {
		std::cerr << "Can't set digital pin as input, exiting" << std::endl;
		return false;
	}
	d_pin->isr(mraa::EDGE_BOTH, &incrementCounter,NULL);

	flowSensor = d_pin;
	return true;
}
bool temperaterSensorSetup() {
	Aio* sensor = new Aio(3);
	if(sensor == NULL) {
		return false;
	}
	tempSensor = sensor;
	return true;
}
float getTemp(Aio* sensor) {
	float a = sensor->readFloat();
	float B = 4275;
	float resistance = 1/a - 1.0;
	resistance *= 100000.0;
	return 1.0/(log(resistance/100000.0)/B+1/298.15)-273.15;
}
bool lcdSetup() {
	upm::Jhd1313m1* temp = new upm::Jhd1313m1(0);
	if(temp == NULL) {
		return false;
	}
	temp->setCursor(0,0);
	temp->write("Waiting to");
	temp->setCursor(1,0);
	temp->write("shower");
	lcd = temp;
	return true;
}
void waitShower() {
	int oldTime = time(NULL);
	while(1) {
		int curTime = time(NULL);
		double seconds = difftime(curTime, oldTime);
		if(seconds < 1) {
			continue;
		}
		if(flowCounter > 6) {
			break;
		}
		flowCounter = 0;
		oldTime = curTime;
	}
}
void inShower(int &startTime, int &flowTotal) {
	startTime = time(NULL);
	int oldTime = time(NULL);
	flowTotal = flowCounter;
	flowCounter = 0;
	lcd->clear();

	if(fork() == 0) {
		system("sh playSong.sh");
		exit(1);
	}

	double elapsedTime;
	float temp;
	while(1) {
		int curTime = time(NULL);
		double seconds = difftime(curTime, oldTime);
		if(seconds < 1) {
			continue;
		}
		elapsedTime = difftime(time(NULL), startTime);
		ostringstream elapsed;
		elapsed << elapsedTime;
		string timeOutput = elapsed.str();
		lcd->setCursor(0,0);
		lcd->write("Duration: " + timeOutput);

		temp = getTemp(tempSensor);
		ostringstream curTemp;
		curTemp << temp;
		string tempOutput = curTemp.str();
		lcd->setCursor(1,0);
		lcd->write("Temp: " + tempOutput);

		if(flowCounter < 5) {
			break;
		}
		flowTotal += flowCounter;
		flowCounter = 0;
		oldTime = curTime;
	}
	lcd->clear();
	lcd->setCursor(0,0);
	lcd->write("Have a");
	lcd->setCursor(1,0);
	lcd->write("great day! :D");
}
int sendMessage(string duration, string volume) {
	int sockfd;
	struct sockaddr_in server_addr;
	int yes = 1;

	if((sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
		perror("socket fail");
		return -1;
	}
	if(setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &yes, sizeof(int)) < 0) {
		perror("setsockopt");
		return -1;
	}

	memset(&server_addr, 0, sizeof(server_addr));
	server_addr.sin_family = AF_INET;
	server_addr.sin_port = htons(12108);
	inet_aton("140.112.42.169", &server_addr.sin_addr);

	if(connect(sockfd, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
		perror("connect");
		return -1;
	}

	cout << "Duration is: " << duration << endl;
	cout << "Volume is: " << volume << endl;

	string msg = "POST " + duration + " " + volume + " ";

	write(sockfd, msg.c_str(), msg.size());
	close(sockfd);
	return 1;
}

int main() {
	if(!platformSetup() || !flowSensorSetup() || !temperaterSensorSetup() || !lcdSetup()) {
		cout << "Couldn't initialize all sensors" << endl;
		return -1;
	}

	int startTime;
	int flowTotal;
	waitShower();

	inShower(startTime, flowTotal);

	double duration = difftime(time(NULL), startTime);
	double liters = flowTotal * 2.00 / 1000;
	cout << "Shower lasted: " << duration << " seconds and used " << liters << " liters of water" << endl;
	ostringstream one;
	one << duration;
	string durationString = one.str();
	ostringstream two;
	two << liters;
	string literString = two.str();
	sendMessage(durationString, literString);

	return 1;
}
