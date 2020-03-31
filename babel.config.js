module.exports =function(api){
  api.cache(false)
  return {
    presets:[["@babel/preset-env",{
      targets:{
        esmodules:true
      }
    }]]
  }
}