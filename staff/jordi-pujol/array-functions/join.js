/**
 * Abstraction of join
 * 
 * Method creates and returns a new string by concatenating all of the elements in an array, separated by commas or a specified separator string.
 * 
 * 
 * @param {Array} arr 
 * @param {*} separator
 * 
 * @throws {Error} If array is not an array
 */

function join (arr, separator){

    var str=""

    if (arguments.length > 2) throw Error('too many arguments');

    if (!separator && separator !=="") separator = ",";

    if (arr.length === 1) str = arr[0].toString()

    else if (arr.length>1){
        for (var i =0; i< arr.length; i++){
            if (i === arr.length-1) str += arr[i].toString()
            else str += (arr[i].toString() + separator);
        };
    }

    return str;
}