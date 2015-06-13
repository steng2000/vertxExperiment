
puts "Main verticle has started, let's deploy some others..."

# Different ways of deploying verticles

# Deploy a verticle and don't wait for it to start
$vertx.deploy_verticle("io.vertx.example.web.auth.Server")

# Deploy another instance and  want for it to start
$vertx.deploy_verticle("io.vertx.example.web.auth.Server") { |res,res_err|
  if (res_err == nil)

    deploymentID = res

    puts "Other verticle deployed ok, deploymentID = #{deploymentID}"

    # You can also explicitly undeploy a verticle deployment.
    # Note that this is usually unnecessary as any verticles deployed by a verticle will be automatically
    # undeployed when the parent verticle is undeployed

    $vertx.undeploy(deploymentID) { |res2,res2_err|
      if (res2_err == nil)
        puts "Undeployed ok!"
      else
        res2_err.print_stack_trace()
      end
    }

  else
    res_err.print_stack_trace()
  end
}

# Deploy specifying some config
config = {
  'foo' => "bar"
}
$vertx.deploy_verticle("io.vertx.example.web.auth.Server", {
  'config' => config
})

# Deploy 10 instances
$vertx.deploy_verticle("io.vertx.example.web.auth.Server", {
  'instances' => 10
})

# Deploy it as a worker verticle
$vertx.deploy_verticle("io.vertx.example.web.auth.Server", {
  'worker' => true
})


