# vertxExperiment
Selective examples from vertx web-examples. 

## Description
When I started learning about vertx.web-examples, I was puzzled by why my vertx web-example program can't find the webroot resources. 
This is true for both trying to run the program in command line as well as using IDE. 
Purusing throught the log files and debugging in IDE, I see this line that showed web-example\web-example.... which lead me to 
experiement copying web-example to where I was executing the command.  

I found there are specific references in io.vertx.example.util.Runner,  prompted my experimentation below. 


## Modification
webroot paths is determined by io.vertx.example.util.Runner.  
Changing to "webpath" as oppose to web-example

This does not appear to be description on how to get web-example running.  Maybe this is a well known practice I just missed?
To get the example program to run as described, create a directory "webpath" and copy src into it. 

## Build issues
The 3.0.0-SNAPSHOT is not deployed in an accessible public repo. 
I was able to get the program to build by git clone vertx-stack and vertx-web perform mvn install to build up the 3.0.0-SNAPSHOT 
artifacts.   TL;DR into pom to figure out how to do it otherwise. 

Once those packages were build, I did 
<b>mvn package </b> it should build successfully.


## Run 
I am only interested in Java and RxJava here.  
When attempting js; it complains about a missing component but it runs fine with core-examples.

vertx program can usually run from command. However, web-example do not run well with milestone5.  
```
cd vertxExample 
vertx run io.vertx.example.auth.Server -cp target/web-example-3.0.0-SNAPSHOT.jar
```

I use IDE to run the program; main is provided to start the program. 

Additionally fat-jar is build and can run with ```java -jar foo-fat.jar```
The pom file buidls fat-jar for chat; To get a fat-jar for other program; just change the main specificaiton in the pom file. 
