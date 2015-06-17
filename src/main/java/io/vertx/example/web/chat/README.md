# vertxExperiment
Selective examples from vertx web-examples. 

## Description
Hazelcast chat example can be setup to demonstrate event bus shared across two machine. 
My test is done within the firewall on two machine in the same subhet. 
The particular test case used TCPIP instead of the default mutlicast. 
I would setup cluster.xml to use one of the machine as the cluster-host (site A)
	I always start siteA first and then have siteB attempt to join.  
	Doing it other way does not work.  Need to learn more about what works and what does not.  
	At this point, I am happy to just see hazelcast in action. 
	


###Site A (The designated cluster host): 
  Run core-example's pubsub Sender in cluster mode sending message every 10 seconds. 
  
###Site B 
  Modify web chat to consume and publish messages to a web page. 
  I am consuming from both the web chart topic as well as the Sender from SiteA. 
  The message is then published to the web page so that I see both the timer news msg as well as anyone typing on the web chat browser. 


