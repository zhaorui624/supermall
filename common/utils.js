export function debounce(func,delay) {
    let time =null
    return function(...args) {
      if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}

