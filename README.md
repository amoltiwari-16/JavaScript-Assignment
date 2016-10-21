# JavaScript-Assignment

Agriculture production of different foodgrains from year 2003 to 2014 at all India level

Source: https://data.gov.in/catalog/agriculture-production-stock-yield

Part 1: Data Munging
The goal of this part is to transform the the data from the raw csv file to a json file with a schema suitable to plot in phase 2.
Steps:
Download the csv version of the data
Write a nodejs program that converts the csv file to json input file for d3.js

Part 2: Plottng
Write a D3.js web page, which …
loads json produced in Part 1
Plot the following …
For the year 2013, plot the all oilseed crop type vs .production, in descending order.
For the year 2013, plot the all the Foodgrains type vs. production, in descending order.
Aggregate all commercial crops and plot the aggregated value vs. year. Note: assume a value of 0 for “NA”.
Plot a stacked chart of rice production in the 4 southern states. Note. In this time period the data is for undivided Andhra Pradesh.