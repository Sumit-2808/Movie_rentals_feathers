export const setDate = ()=> {
  return async (context) => {
    const date = new Date()
    if (context.method == "create"){
      context.data.dateOut=date;
    }else if(context.method=="patch"){
       context.data.dateIn = date;
    }
       console.log(context.method);
    return context
  }
}
