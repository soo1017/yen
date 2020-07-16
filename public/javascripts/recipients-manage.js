var recipient = {};

$(document).ready(function() {
    var img1 = "./../stylesheets/recipient/throbber.gif";

    function FileUpload(img, file) {
        var reader = new FileReader();
//        console.log("this-1: ", this);
//        this.ctrl = createThrobber(img);
        var xhr = new XMLHttpRequest();
        // console.log("this-1: ", this);
        this.xhr = xhr;

        var self = this;
        // console.log("self: ", this);
        this.xhr.upload.addEventListener("progress", function(e) {
            // console.log('porgress', e.lengthComputable);
            if (e.lengthComputable) {
                // console.log('e.lengthComputable', e.lengthComputable);
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

//    $('form#id-recipient-info').submit(function(e) {
//        e.preventDefault();
//        var formData = new FormData(this);
//
//        console.log(formData);
//
//        var i_url = "https://www.youthempoweringnation.org/recipients/recipients-manage/add-recipient";
//        $.ajax({
//            url: i_url,
////            url: $(this).attr('action'),
//            data: formData,
//            type: 'POST',
//            cache: false,
//            contentType: false,
//            processData: false,
//            beforeSend: function(xhr){xhr.setRequestHeader('x-auth', sessionStorage.getItem('token'));}
//        }).then(function(data, textStatus, jqXHR) {
//            if (jqXHR.status == 200) {
//                console.log('success');
//            } else if (jqXHR.status == 405) {
//
//            } else {
//               console.log('fail');
//            }
//        }).fail(function(jqXHR, textStatus, errorThrown) {
//            if (jqXHR.status == 200) {
//                console.log('success');
//            } else if (jqXHR.status == 405) {
//
//            } else {
//                console.log('fail');
//            }
//        });
//        e.preventDefault();
//        var files = $(this).get(0).files;
//
//        console.log("files: ", files);
//
//        if (files.length > 0) {
//            var formData = new formData();
//            for (var i = 0; i < files.length; i++) {
//                var file = files[i];
//                formData.append('filename[]', file, file.name);
//            }
//            formData.append("recipientName", $('#id-recipient-name').val());
//            formData.append("recipientAge", $('#id-age').val());
//            formData.append("recipientSex", $('#id-sex').val());
//            formData.append("recipientBirth", $('#id-recipient-birth').val());
//            formData.append("recipientCountry", $('#id-country').val());
//            console.log(formData);
//
//            $.ajax({
//                url: '/recipients-manage/add-recipient',
//                headers: { 'x-auth': sessionStorage.token },
//                type: 'POST',
//                data: formData,
//                cache: false,
//                contentType: false,
//                processData: false,
//                success: function(data) {
//                    console.log(data);
//                }
//            }).then(function(data, textStatus, jqXHR) {
//                if (jqXHR.status == 200) {
//                    console.log('success');
//                } else if (jqXHR.status == 405) {
//
//                } else {
//                   console.log('fail');
//                }
//            }).fail(function(jqXHR, textStatus, errorThrown) {
//                if (jqXHR.status == 200) {
//                    console.log('success');
//                } else if (jqXHR.status == 405) {
//
//                } else {
//                    console.log('fail');
//                }
//            });
//        }
////    });
//    });


    $('.cls-logout').click(function(e) {
        e.preventDefault();

//        string strScript = "<script>var Backlen=history.length;history.go(-Backlen);window.location.href='https://www.youthempoweringnation.org/recipients/login';<script>";

        var data1 ={};
        // console.log("ajax-delete");
        // var url_delete = "/recipients/recipients-manage/logout";
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
