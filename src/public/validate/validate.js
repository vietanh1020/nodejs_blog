function Validator(options){
    function validate(inputELement , rule){
        var errorElement  = inputELement.parentElement.querySelector(options.errorElement)
        
        //Lấy ra các rule cần validate
        let rules = selectorRules[rule.selector]
        var errorMessage

        for (let i = 0; i < rules.length; i++ ){
            errorMessage = rules[i](inputELement.value)
            if(errorMessage) break   
        }

        if (errorMessage){
            errorElement.innerText = errorMessage
            inputELement.parentElement.classList.add('invalid')
        } else{
            errorElement.innerText = ''
            inputELement.parentElement.classList.remove('invalid')
        }

        return (!!errorMessage)

    }

    var selectorRules = {}

    var formElement = document.querySelector(options.form)
    if (formElement){       
        formElement.onsubmit = function(e){
            var isFormError = false
            var data  =  {}
            options.rules.forEach(rule => {
                var inputELement = formElement.querySelector(rule.selector)
                var isError = validate(inputELement, rule )
                if (isError){
                    isFormError = true
                }
            })
            
            if(!isFormError){
                //thực hiện hàm dc truyền vào khi submit     
                if(typeof(options.callback) == 'function'){
                    // lấy dữ liệu đã dc nhập từ form
                    var listInput = formElement.querySelectorAll('input')
                    listInput.forEach(function(input){
                        data[input.name] = input.value
                    })

                    options.callback(data)
                }
            }
            else{
                e.preventDefault()
            } 
        }



        options.rules.forEach(rule => {
            // Lưu lại các rules
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test)
            }else{
                selectorRules[rule.selector] = [rule.test]
            }
            

            var inputELement = formElement.querySelector(rule.selector)
            

            inputELement.onblur = function(){
                validate(inputELement, rule )
            }   
    
            inputELement.oninput = function(){
                var errorElement  = inputELement.parentElement.querySelector(options.errorElement)
                errorElement.innerText = ''
                inputELement.parentElement.classList.remove('invalid')
            }
        })
    }

}


Validator.isRequired = function(selector, message){
    return {
        selector : selector,
        test :  function(value){
            return value.trim() ? undefined : message ||'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function(selector, message){
    return {
        selector : selector,
        test :  function(value){
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(String(value).toLowerCase()) ? undefined : message ||'Địa chỉ email không hợp lệ'
        }
    }

}

Validator.isPassword = function(selector, min, message){
    return {
        selector : selector,
        test : function(value){
            return value.length >= min ? undefined : message ||'Mật khẩu phải có ít nhất 8 kí tự'
        }
    }
}

Validator.isPasswordConfirm = function(selector, getPassWord, message){
    return {
        selector : selector,
        test : function(value){
            return value === getPassWord() ? undefined : message || 'Thông tin này chưa chính xác'
        }
    }
}