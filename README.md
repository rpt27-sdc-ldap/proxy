# FEC Reverse Proxy
Create an Audible Item Page using Service Oriented Architecture and compiled to an individual client using AWS S3 and an Express reverse proxy.

## Table of Contents
- [1.1 Related Projects](#11-related-projects)
- [1.2 Usage ](#12-usage)
- [1.3 Requirements / Set Up](#13-requirements--set-up)
- [1.4 Backlog / Noted Opportunities](#14-backlog--noted-opportunies)

## 1.1 Related Projects
- [Title Service](https://github.com/huang-pei-mei/title-service)
- [Also Enjoyed Service](https://github.com/huang-pei-mei/also-enjoyed-service)
- [Summary Service](https://github.com/huang-pei-mei/FEC-Publishers-Summary)
- [Aggregate Review Service](https://github.com/huang-pei-mei/FEC-Agg.Review)
- [Review Service](https://github.com/huang-pei-mei/reviews-service)
- [Price Service](https://github.com/huang-pei-mei/price-service)

## 1.2 Usage
The FEC Reverse Proxy creates a look-alike Audible Item Page. It combines all services by pulling bundle files and assets from an S3 bucket, and proxies all client requests to their associated deployed service addresses (all running on AWS EC2).

Technologies Used:
- Node.js
- Express
- AWS S3
- AWS EC2

![Audible Item Page](./readmeAssets/audible_proxy.gif)

![Audible Item Page Mobile](./readmeAssets/audible_proxy_mobile.gif)

### 1.2.2 Deployed Web Address
*Note*: Only available when EC2 instance is running.
See deployed service [here](http://ec2-34-219-131-242.us-west-2.compute.amazonaws.com:5500/?bookId=6)

## 1.3 Requirements / Set Up
**Requirements:**
- Node v14.15.0

### 1.3.1 Install Dependencies
1. Within root directory, run
`npm install`

### 1.3.2 Start Service
1. Within root directory, launch server:
`npm start`

## 1.4 Backlog / Noted Opportunies
- Enable RESTful client with path parameters instead of query parameters
- Improve client accessibility