var recipient = {};

$(document).ready(function() {
    var img1 = "./../stylesheets/recipient/throbber.gif";
    
    function FileUpload(img, file) {
        var reader = new FileReader();  
//        console.log("this-1: ", this);
//        this.ctrl = createThrobber(img);
        var xhr = new XMLHttpRequest();
        console.log("this-1: ", this);
        this.xhr = xhr;

        var self = this;
        console.log("self: ", this);
        this.xhr.upload.addEventListener("progress", function(e) {
            console.log('porgress', e.lengthComputable);
            if (e.lengthComputable) {
                console.log('e.lengthComputable', e.lengthComputable);
                var percentage = Math.round((e.loaded * 100) / e.total);
                self.ctrl.update(percentage);
            }
        }, false);

        xhr.upload.addEventListener("load", function(e){
              self.ctrl.update(100);
              var canvas = self.ctrl.ctx.canvas;
              canvas.parentNode.removeChild(canvas);
        }, false);
        xhr.open("POST", "https://www.youthempoweringnation.org/recipients/recipients-manage/add-recipient");
//        xhr.open("POST", "http://demos.hacks.mozilla.org/paul/demos/resources/webservices/devnull.php");
        xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
        reader.onload = function(evt) {
            xhr.send(evt.target.result);
        };
        reader.readAsBinaryString(file);
    }
    
//    var files;
//    $('#id-picture').on('change', prepareUpload);
//    function prepareUpload(event){
//        files = event.target.files;
//        console.log("files:: ", files);
//    }; 
    
    $('.cls-manage02-div060-input').click(function(e) {
        e.preventDefault();
//        var yen = {};
//        yen.name = "soo lee";
//        var recipient_url = "https://www.youthempoweringnation.org/recipients/recipients-manage/add-recipient";
//        $.ajax({
//                        url: recipient_url,
//                        type: 'post',
//                        dataType: 'json',
//                        data: yen,
//                        beforeSend: function(xhr){xhr.setRequestHeader('x-auth', sessionStorage.getItem('token'));}
//                }).then(function(data, textStatus, jqXHR) {
//                    if (jqXHR.status == 200) {
//                        console.log("success");
//                    } else if (jqXHR.status == 405) {
//
//                    } else {
//                        console.log("fail");
//                    }
//                }).fail(function(jqXHR, textStatus, errorThrown) {
//                    if (jqXHR.status == 200) {
//                        console.log("success");
//                    } else if (jqXHR.status == 405) {
//
//                    } else {
//                        console.log("fail");
//                    }
//                });
//        e.preventDefault();
        
        var recipient_url = "https://www.youthempoweringnation.org/recipients/recipients-manage/add-recipient";
//        recipient.recipientName = $('#id-recipient-name').val();
//        recipient.recipientAge = $('#id-age').val();
//        recipient.recipientSex = $('#id-sex').val();
//        recipient.recipientBirth = $('#id-recipient-birth').val();
//        recipient.recipientCountry = $('#id-country').val();
//        
//        var selectedFile = document.getElementById('id-picture').files;
//        var files = e.dataTransfer.files[0].name;
//        console.log("files: ", files);
//        
//        console.log("picture: ", selectedFile);
//        
//        FileUpload(img1, selectedFile);
        
//        var formData=new FormData();
//        formData.append('recipientPicture', $('input#id-picture')[0].files[0]);
//        formData.append("recipientName", $('#id-recipient-name').val());
//        formData.append("recipientAge", $('#id-age').val());
//        formData.append("recipientSex", $('#id-sex').val());
//        formData.append("recipientBirth", $('#id-recipient-birth').val());
//        formData.append("recipientCountry", $('#id-country').val());
//        
//        console.log("formData: ", formData);
//        var recipient_url = "https://www.youthempoweringnation.org/recipients/recipients-manage/add-recipient";
        $.ajax({
            url: recipient_url,
//            url:"page.php",
            data:formData,
            type: 'POST',
//            dataType:"JSON",
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function(xhr){xhr.setRequestHeader('x-auth', sessionStorage.getItem('token'));}
//            success:function(data){ }
        }).then(function(data, textStatus, jqXHR) {
            if (jqXHR.status == 200) {
                console.log("success");
            } else if (jqXHR.status == 405) {
                
            } else {
               console.log("fail");
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 200) {
                console.log("success");
            } else if (jqXHR.status == 405) {
            
            } else {
               console.log("fail");
            }
        });
    });
    
    $('.cls-logout').click(function(e) {
        e.preventDefault();

//        string strScript = "<script>var Backlen=history.length;history.go(-Backlen);window.location.href='https://www.youthempoweringnation.org/recipients/login';<script>";
        
        var data1 ={};
        console.log("ajax-delete");
        var url_delete = "https://www.youthempoweringnation.org/recipients/recipients-manage/logout";
        $.ajax({
            url: url_delete,
            type: 'DELETE',
            dataType:"JSON",
            data: data1,
            beforeSend: function(xhr){xhr.setRequestHeader('x-auth', sessionStorage.getItem('token'));}
//            success: function(data, textStatus, jqXHR) { 
//                alert('Success!' + authHeader); 
//                window.location.href="https://www.youthempoweringnation.org/recipients/login";
//            }
        }).then(function(data, textStatus, jqXHR) {
            if (jqXHR.status == 200) {
//                ClientScript.RegisterClientScriptBlock(this.GetType(), "ClearHistory", strScript);
//                window.history.go(-1);
                window.location.href="https://www.youthempoweringnation.org/recipients/login";
            } else if (jqXHR.status == 405) {
                
            } else {
               
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 200) {
//                ClientScript.RegisterClientScriptBlock(this.GetType(), "ClearHistory", strScript);
//                window.history.go(-1);
                window.location.href="https://www.youthempoweringnation.org/recipients/login";
            } else if (jqXHR.status == 405) {
            
            } else {

            }
        });
        
        
    });
    
    
});
