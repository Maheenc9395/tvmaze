let contentDiv;

const apiURL ="https://opentdb.com/api.php?amount=5";


window.onload = function (){
    contentDiv = document.getElementById("content");

    fetchContent();
}



async function fetchContent(){
    try{

        const response = await fetch(apiURL);

        const data = await response.json();

        console.log(data);

        fetchContent(data);

    }catch (error){
        console.error('error fetching activity: ', error);
    }
}
