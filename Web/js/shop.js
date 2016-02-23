//Create another table which will appear on the left of our webpage
//Parameters:
//nameOfProduct - name of the product being added
//searchID - the ID of each element in the search result table --> should start with searchR
function makeTableData(nameOfProduct, searchID) {

    //Tables are displayed in html by doing <table>     ....     </table>
    //The function completes the ... part between the table

    // Create the data elemet <td></td>
    var item = document.createElement('td');

    // Create the row element <tr></tr>
    var row = document.createElement('tr');

    row.id = "tr-" + searchID; //ID for wish list rows

    //add a class name if necessary
    row.className = "wishListItems";

    //Append name to item
    //This method will APPEND the nameOfProduct BETWEEN the <td> (RIGHT HERE) </td>
    item.appendChild(document.createTextNode(nameOfProduct));

    //Append item to row
    //This time, it will append here <tr> (RIGHT HERE) </tr>
    row.appendChild(item)

    // Finally, return the constructed list:
    return row; //<tr><td>nameOfProduct</td></tr> is the result in the end
}


//Using anonymous function in order to avoid conflicts between script
(function (){

    //The following is to include the jQuery script
    //Allows us to use jQuery notation
    var script = document.createElement('script');
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js";
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
    //-------------------------------------------------------------------------

    //Setting the variables
    var name, price, url, img, idOfTableRow, idData, arrayOfWebIDs;


    //When the document, "webpage", is ready --> link document to the following ANONYMOUS function
    $(document).ready(function(){

        //Defining function

        //You can think of this as an if Function
        //The following links all objects with CLASS table-hover and ELEMENT tr to the click event
        // --> If you click this element, trigger this function
        $('.table-hover tr').click(function(){

            //toggleClass adds a class value to your object
            $(this).toggleClass("Selected");

            //This variable is needed for the function makeTableData
            idOfTableRow = $(this).attr('id');

            //Each var is set through this method
            //$(this) is the object in question which FINDS the object which has div "key" with attribute
            name = $(this).find($("div #name")).attr('value');
            price = $(this).find($("div #Price")).attr('value');
            url = $(this).find($("div #URL")).attr('value');
            img = $(this).find($("div #Photo")).attr('value');
            idData = $(this).find($("div #webID")).attr('value'); //<------THIS THING IS THE WEB ID

            //For displaying as an alert
            //var print = "" + name + price + url + img + idData;
            //alert(print)

            //if object has the class Selected
            if($(this).hasClass("Selected")){

                //In the document, find the element tablebody by ID and appendChild (so basically append elements into this body)
                //Use the makeTableData to create the wishlists of elements
                document.getElementById('tableBody').appendChild(makeTableData(name, idOfTableRow));
            }

            else{
                //alert(idOfTableRow);


                //When the user clicks a SELECTED element, remove it from the wishlist by doing the following
                $("#tr-" + idOfTableRow).remove(); //tr- because keys in the wishlist starts by tr-

                //("#" + idOfTableRow).toggleClass();
            }
        });

    });

    //Handle the onclick event for the submitWish Button
    $("#submitWish").on("click", function(){

        //Create an array
        var array = [];

        //For each element with the CLASS Selected
        $(".Selected").each(function(){

            //Push the object's ($(this)) webID value into this array
            array.push($(this).find("div #webID").attr('value'));
        });

        //Explode array as a string
        var str = array[0];

        //Add a comma between each webID value
        for(var i = 1; i < array.length; i++){
            str = str +  "," + array[i];
        }

        //Use AJAX which is part of jQuery to send variables to php
        //$ : this script

        $.ajax({
            type: 'post', //the type from php: how it handles elements
            url: '/shop.php', //where your php function is located
            data: {str2php : str} //str2php is the variable which is converted, str is the variable you want to send

            //This function is sending str2php with data from str to the shop.php file for handling with type POST
        });

        //When this is done, remove every element with wishListItems
		$(".wishListItems").remove();
    });

    //When the user clicks on the cancel button
    $("#cancelWish").on("click", function(){
            $(".wishListItems").remove();
    });




}) ();