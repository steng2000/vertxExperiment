# vertxExperiment
Selective examples from vertx web-examples. 

== Description
When I started learning about vertx.web-examples, I was puzzled by why my vertx web-example program can't find the webroot resources. 
This is true for both trying to run the program in command line as well as using IDE. 
Purusing throught the log files and debugging in IDE, I see this line that showed web-example\web-example.... which lead me to 
experiement copying web-example to where I was executing the command.  

I found there are specific references in io.vertx.example.util.Runner,  prompted my experimentation below. 


== Modification
webroot paths is determined by io.vertx.example.util.Runner.  
Changing to "webpath" as oppose to web-example

This does not appear to be description on how to get web-example running.  Maybe this is a well known practice I just missed?
To get the example program to run as described, create a directory "webpath" and copy src into it. 


Testing out pushing to github.