const table_class_name = "table";
const pieces_class_name = "pieces";
const storedImgDataPath = "storedImg";

function saveImg(el) { localStorage.setItem(storedImgDataPath, el.target.dataset.imgNumber); }
function replacePiece(el)
{
    var storedImg = localStorage.getItem(storedImgDataPath);
    el.target.style.backgroundImage = "url(./src/img/"+storedImg+".jpg)"; 
    el.target.dataset.imgNumber = storedImg;
    localStorage.removeItem(storedImgDataPath);
}

function checkPuzzleCompleteness(el)
{
    var completed = true;
    var table = document.querySelector("."+table_class_name);
    table.childNodes.forEach(row => {
        row.childNodes.forEach(cell => {
            if (cell.dataset.imgNumber != cell.dataset.cellNumber)  completed = false;
        });
    });
    if (completed)  alert("Completed!");
}

function loadTable()
{
    var pieces_container = document.querySelector("."+pieces_class_name);
    const pieces_count = 9;

    var pieces_indexes = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    for (let piece_index = 1; piece_index < pieces_count + 1; piece_index++)
    {
        var piece = document.createElement("span");
        piece.dataset.imgNumber = pieces_indexes.pop();
        piece.style.backgroundImage = "url(./src/img/"+piece.dataset.imgNumber+".jpg)";
        piece.addEventListener("click", saveImg);
        pieces_container.appendChild(piece);
    }

    var table_container = document.querySelector("."+table_class_name);
    const row_count = 3;
    const cell_count = 3;
    
    var temp_index = 0;

    for (let row_index = 1; row_index < row_count + 1; row_index++) 
    {
        var table_tr = document.createElement("tr");
        for (let cell_index = 1; cell_index < cell_count + 1; cell_index++) 
        {
            var table_td = document.createElement("td");
            table_td.dataset.cellNumber = cell_index + temp_index;
            table_td.addEventListener("mousedown", replacePiece);
            table_td.addEventListener("mouseup", checkPuzzleCompleteness);
            table_tr.appendChild(table_td);
        }
        table_container.appendChild(table_tr);
        temp_index += 3;
    }
}