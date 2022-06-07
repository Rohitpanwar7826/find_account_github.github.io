
const ajaxRequest=()=>{
    const userName = document.getElementById('user_name').value;
    if (userName=="" || userName.trim().length <= 0  )
    {
        alert("Please Enter User name")
    }
    const xhr =new XMLHttpRequest();

    xhr.open('GET', `https://api.github.com/users/${userName}`,true);
    
    xhr.onload = function(){
        if(xhr.readyState == 4 || xhr.status == 200)
        {
            showData(xhr);
        }
        else{
            alert("An error occured")
        }
    }


    xhr.send()


}


function showData(xhr)
{
    const jsonData=JSON.parse(xhr.response);

    if(jsonData["login"])
    {
        const date = new Date(jsonData["created_at"])
        const createAt = date.toLocaleDateString();
        const profile = document.getElementById("profile");
        profile.innerHTML = `
        <div class="h-full w-full flex justify-center items-center  text-center overflow-hidden p-1">
        <div
            class="bg-white rounded-b rounded-b-none rounded-r p-1 flex flex-col justify-between leading-normal p-2">
            <div class="mb-4">
                <p class="text-sm text-gray-600 flex items-center">
                    <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <path
                            d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                    </svg>
                    ${(jsonData["location"]) ? jsonData["location"]: "location not found"}
                </p>
                <div class="text-gray-900 font-bold text-xl mb-2">${(jsonData["name"]) ? jsonData["name"]: "name not found"}
                   <p class="font-normal p-1">Since : ${createAt} </p>
                </div>
                <p class="text-gray-700 text-base text-sm mt-2">ID: ${(jsonData["id"])}</p>
                <p class="text-gray-700 text-base text-sm mt-2">Company: ${(jsonData["company"]) ? jsonData["company"]: "not found"}</p>
                <p class="text-gray-700 text-base text-sm mt-2">Followers: ${(jsonData["followers"])}</p>
                <p class="text-gray-700 text-base text-sm mt-2">Following: ${(jsonData["following"])}</p>
                <p class="text-gray-700 text-base text-sm mt-2">Public_repos: ${(jsonData["public_repos"])}</p>
                <a class="text-sm mt-2 text-blue-500" href=${jsonData["html_url"]} target="_blank"> Github profile </a>
                <p class="text-gray-700 text-base text-sm mt-2">Bio: ${(jsonData["bio"]) ? jsonData["bio"]: "not found"}.</p>
            </div>
            <div class="flex flex-col items-center">
                <img class="w-full xl:h-96 bg-cover"
                    src=${jsonData['avatar_url']}
                    alt="Avatar">0
           </div>
        </div>   
        `
    }
    else{
     alert("User not found")
    }

}
