# vertxExperiment
Selective examples from vertx web-examples. 

## Description
When I started learning about vertx.web-examples, I was puzzled by why my vertx web-example program can't find the webroot resources. 
This is the case for running program in command line and IDE
<ul>
<li>vertx run </li>
<li>java -jar fat.jar</li>
<li>IDE (eclipse) </li>
</ul>

Purusing throught the log files and debugging in IDE, I see an entry showing web-example\web-example.... 
which lead me to make a copy of web-example/src/* to where I was executing the command.  
I also found specific references in io.vertx.example.util.Runner which reference web-example as WEB_EXAMPLE_DIR. 
This is where eclipse uses to run main.  Eventually a reference for Apex in vertx2 yieleded the classpath clue.

<b>vertx run</b>
```
Vertx default resource path to webroot which usually means you need 
  webroot and its artifacts in the filesystem.   
  Moving the webroot to where I do "vertx run" was able to obtain the resources.
```
<b> java -jar </b>
```
  The jar file could contain the resource that matches classpath, 
  If we have have webroot resources included in the jar then it 
  should be able to find them. web-example do not include them.  
  Modify pom to add the additional resources should make it possilbe 
  for verticle to obtain the resources.  Modfication below detail what was done.  
```
<b> IDE (eclipse)</b>
```
The main program could run out of the box with slight change to the runner program. 
```
## Modification
IDE's webroot paths is determined by io.vertx.example.util.Runner.  
copy web-example/src to web-example making a structure like web-example/web-example/src/main.../webroot
will work.  I changed the web-example-dir to '.' which resolve the path and with the chagne we no longer need to make the copy. 

Java -jar would need pom.xml chagne to include resource (will add desription at a later update to ths README)


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
