const validate = {
  //判断手机号码
  isPhone(name) {
    let status = false;
    let reg = new RegExp("^1[3|4|5|6|7|8|9][0-9]{9}$");
    if(reg.test(name))
    {
      status = true;
    }
    return status;
  },
  //判断邮箱
  isEMaill(name){
    let status = false;
    let reg = new RegExp("^[a-zA-Z1-9][a-z0-9._\\-]{2,18}@([a-zA-Z0-9]{2,15}.){1,3}[a-z]{2,10}$");
    if(reg.test(name))
    {
      status = true;
    }
    return status;
  },
  //判断Url
  isUrl(name){
    let status = false;
    let reg = new RegExp("^(https|http|ftp)://[A-Za-z]{1,10}.[A-Za-z0-9]+.[a-z]{2,8}$");

    if(reg.test(name))
    {
      status = true;
    }
    return status;
  },
  //判断汉字,2至30位
  isChinese (name){
    let status = false;
    let reg = new RegExp("^[\u4E00-\u9FA5]{1,30}$");
    if(reg.test(name)){
      status = true;
    }
    return status;
  },
  //判断6至8位数字
  isNumber(name){
    let status = false;
    let reg = new RegExp("^[0-9]{6,8}$");
    if(reg.test(name)){
      status = true;
    }
    return status;
  },
  //判断是字母(2-18)
  isChar(name){
    let status = false;
    let reg = new RegExp("^[a-zA-Z]{2,18}$");
    if(reg.test(name)){
      status = true;
    }
    return status;
  },
  //判断字母加斜杠（2-40）
  isCharT(name){
    let status = false;
    var reg = new RegExp("^([a-zA-Z0-9]+/[a-zA-Z0-9]+){1,3}$");
    if(reg.test(name)){
      status = true;
    }
    return status;
  },
  //判断字母加斜杠_-（2-40）
  isCharTT(name){
    let status = false;
    var reg = new RegExp("^[a-zA-Z0-9\\-\_]{1,19}[/][a-zA-Z0-9\\-\_]{1,20}$");
    if(reg.test(name)){
      status = true;
    }
    return status;
  },

  //判断字母|汉字,2至20位
  isName(name){
    let status = false;
    let reg = new RegExp("^[\u4E00-\u9FA5A-Za-z]{2,20}$");
    if(reg.test(name)){
      status = true;
    }
    return status;
  },
  //判断由字符+数字，2至20位，字母开头
  isAccount(name){
    let status = false;
    let reg = new RegExp("^[a-zA-Z][a-zA-Z0-9|\-]{1,19}$");
    if(reg.test(name)){
      status = true;
    }
    return status;
  },
  //创建密码，判断由大写字母、小写字母、数字和特殊字符串组成,6至18位
  isAddPassword(name){
    let status = false;
    let reg = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,18}");
    if(reg.test(name)){
      status = true;
    }
    return status;
  },
  //判断由字母|数字|字符组成,6至18位
  isPassword(name){
    let status = false;
    let reg = new RegExp("^[A-Za-z0-9@$!*\.\\-\_]{6,18}$");
    if(reg.test(name)){
      status = true;
    }
    return status;
  },
  //判断字母+数字+下划线组成(4-20)
  isString(name){
    let status = false;
    let reg = new RegExp("[a-zA-Z0-9\\-\_]{4,20}$");
    if(reg.test(name)){
      status = true;
    }
    return status;
  },
  //判断字母|汉字/字符,2至40位
  isSentence (name){
    let status = false;
    let reg = new RegExp("^[\u4E00-\u9FA5A-Za-z@，,。、!！*\.\\-\_]{2,40}$");
    if(reg.test(name)){
      status = true;
    }
    return status;
  },

  //判断字母+数字+下划线组成+横线-， 并且必须是字母开头(2-21)
  isStringT(name){
    let status = false;
    let reg = new RegExp("^[a-zA-Z][a-zA-Z0-9\\-\_]{1,20}$");
    if(reg.test(name)){
      status = true;
    }
    return status;
  },


  //去除字符串两头空格
  dislodgeBlank(name){
    return name.replace(/^\s+|\s+$/g,"");
  },
  //去除字符串所有空格
  allDislodgeBlank(name){
    return name.replace(/\s+/g,"");
  },
  //去除字符串左空格
  leftDislodgeBlank(name){
    return name.replace( /^\s*/, '');
  },
  //去除字符串右空格
  rightDislodgeBlank(name){
    return name.replace( /^\s*/, '');
  }
};

export default validate;
