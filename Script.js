var blobfile;
var images = document.getElementById("AllImages");
var message = document.getElementById("Message");
var blobAccountName = "kranthiblob";
var blobKey = "CmJh1mhwcGMJ7jjOpSKlXDxLY+hKSOUZv13yw5MokfKj+lnxQ3fIY1ZiUd/iDk87jUgS7782TTm3VfVbUDX/KA==";
var blobUrl = "https://kranthiblob.blob.core.windows.net/";
var blobService = AzureStorage.createBlobService(blobAccountName, blobKey, blobUrl);
var container = "images";
var url= blobUrl + container +"/";

function saveFile() {
    blobfile = event.target.files[0];
}

function uploadBlob() {
    blobService.createBlockBlobFromBrowserFile(container, blobfile.name, blobfile, function (error, result, response) {
        if (error) {
            message.innerHTML= "Upload failed";
        } 
        else {
            getAllFiles();
            message.innerHTML= "Upload success";
        }
    });
}

function getAllFiles(){
    blobService.listBlobsSegmented(container,null,(error,result)=>{
        if(error)
        {
            message.innerHTML= "Getting images failed";
        }
       
        if(result)
        {
            console.log(result);
            images.innerHTML= "";
            result.entries.forEach(function(element) {
                var ImgUrl = url+element.name;
                var ImageTag = `<img src=${ImgUrl} ><br><br>`;
                images.innerHTML += ImageTag;
            });
        }
        })
}

document.body.onload = getAllFiles();