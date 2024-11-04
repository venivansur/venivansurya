function sendToMail(event) {
    event.preventDefault();


    const inputName = document.getElementById("input-name").value;
    const inputEmail = document.getElementById("input-email").value;
    const inputPhone = document.getElementById("input-phone").value;
    const inputSubject = document.getElementById("input-subject").value;
    const inputMessege = document.getElementById("input-message").value;



    if (inputName == "") {
    return alert ("Name tidak boleh kosong!"); }
    if (inputEmail == "") {
     return alert ("Email tidak boleh kosong!");}
    if (inputPhone == "") {
     return alert ("Phone tidak boleh kosong!");}
    if (inputSubject == "") {
     return alert ("Subject tidak boleh kosong!");}
    if (inputMessege == "") {
     return alert ("Messege tidak boleh kosong!");}


     console.log(inputName)
     console.log(inputEmail)
     console.log(inputPhone)
     console.log(inputSubject) 
     console.log(inputMessege)
                
     const a = document.createElement("a");
     a.href = `mailto:${inputEmail}?subject=${inputSubject}&body=${inputMessege}`;
     a.click()
            
    
    



}


