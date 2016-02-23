function makeTableData(nameOfProduct, searchID) {

            // Create the data elemet
            var item = document.createElement('td');

            // Create the row element
            var row = document.createElement('tr');

            row.id = "tr-" + searchID; //ID for wish list rows

            //add a class name if necessary
            row.className = "wishListItems";

            //Append name to item
            item.appendChild(document.createTextNode(nameOfProduct));


            //Append item to row
            row.appendChild(item)

            // Finally, return the constructed list:

            return row; //<tr><td>nameOfProduct</td></tr>
    }

(function (){
    var script = document.createElement('script');
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js";
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);

    var name, price, url, img, idOfTableRow, idData, arrayOfWebIDs;


    $(document).ready(function(){

        $('.table-hover tr').click(function(){
            $(this).toggleClass("Selected");

            idOfTableRow = $(this).attr('id');

            name = $(this).find($("div #name")).attr('value');
            price = $(this).find($("div #Price")).attr('value');
            url = $(this).find($("div #URL")).attr('value');
            img = $(this).find($("div #Photo")).attr('value');
            idData = $(this).find($("div #webID")).attr('value'); //<------THIS THING IS THE WEB ID

            var print = "" + name + price + url + img + idData;

            if($(this).hasClass("Selected")){
                document.getElementById('tableBody').appendChild(makeTableData(name, idOfTableRow)); //we're here
            }

            else{
                //alert(idOfTableRow);
                $("#tr-" + idOfTableRow).remove();
                //("#" + idOfTableRow).toggleClass();
            }
        });

    });

    $("#submitWish").on("click", function(){
        var array = [];

        $(".Selected").each(function(){
            array.push($(this).find("div #webID").attr('value'));
        });

        var str = array[0];

        for(var i = 1; i < array.length; i++){
            str += "," + array[i];
        }

        //$("#submitWishList").val(str);

        //$("#submitWishList").trigger('hidden');

        $.ajax({
            type: 'post',
            url: '/shop.php',
            data: {str2php : str}
        });

		$(".wishListItems").remove();
        $('.table-hover tr .Selected').toggleClass("Selected");
    });


    $("#cancelWish").on("click", function(){
            $(".wishListItems").remove();
            $('.table-hover tr .Selected').toggleClass("Selected");

    });




}) ();