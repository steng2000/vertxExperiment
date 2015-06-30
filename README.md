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
  Moving the webroot to where I do "vertx run" resolved teh missing webroot resources.
```
<b> java -jar </b>
```
  The jar file could contain the resource that matches classpath, 
  If we have webroot resources included in the jar then it 
  should be able to find them. web-example do not include them in their pom.  
  Modify pom adding the additional resources make it possilbe for verticles
  to obtain the webroot resources.  Modfication below detail what was done.  
```
<b> IDE (eclipse)</b>
```
The main program could run out of the box with slight change to the runner program. 
```
## Modification
IDE's webroot paths is determined by io.vertx.example.util.Runner.  
copy web-example/src to web-example making a structure like web-example/web-example/src/main.../webroot
will work.  I changed the web-example-dir to '.' which resolve the path and remove the copy step above. 

Java -jar would need pom.xml modification to enable fat jar and inclusion of webroot.
The current pom uses angularjs as an example, I copy angularjs's webroot to where pom.xml is located, add 
<resources> specification in our pom's build block.  
```
"." to pickup webroot and 
main/resources to include propreties files needed to run the program at root path.
```

There does not appear to be description on how to get web-example running.  Maybe this is a well known practice I just missed?
In any event, with the modification described above, I am now able to run web-example programs on command line, eclipse, as well 
as a fat-jar.

## Build issues
This is no longer an issue with the release of 3.0.0 on June 24, 2015.
The 3.0.0-SNAPSHOT was not deployed in a public repo.
I was able to get the example program to build by git clone vertx-stack and vertx-web and perform mvn install.
That build up the 3.0.0-SNAPSHOT artifacts to allow a milestone 6 build.  
Once those packages were build, I did <b>mvn package </b> and the web-example finally build successfully.

One other note: My company's antivirus program takes up port 8081 which cause unit-example test to fail.  
I changed 8081 to a different port to workaround it. 


## Run 
I am only interested in Java and RxJava here. 

`Need to check if 3.0.0 fix the js issue below`

When attempting js; it complains about a missing component but it runs fine with core-examples.

vertx program can usually run from command. However, web-example do not run well with milestone5/6.  

```
For Java:
cd vertxExample 
vertx run io.vertx.example.chat.Server -cp target/web-example-3.0.0.jar
```
I use IDE to run the program; main is provided to start the program. 

Additionally fat-jar is now part of the build and can run with ```java -jar foo-fat.jar```
```
The pom file buidls fat-jar for chat; 
To get a fat-jar for other program; 
change the main specificaiton in the pom file. 
copy that example's webroot to the directory where pom.xml resides
```

