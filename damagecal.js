function clickResultDisp(){
    var atk = document.getElementById("attack").value;
    var def = document.getElementById("defence").value;
    var pwr = document.getElementById("power").value;
    var efc = document.getElementById("effect").value;
    atk = parseInt(atk); def = parseInt(def); pwr = parseInt(pwr)
    var result;
    result = 22 * parseInt(pwr * atk / def);
    result = parseInt(result /50) +2;
    var min;
    min = parseInt(0.85 * result);
    if (document.getElementById("STAB").checked){
        result = parseInt(result * 1.5);
        min = parseInt(min * 1.5);
    }
    result = parseInt(result * efc);
    min = parseInt(min * efc);
    document.getElementById("result").innerHTML = String(min) + ' ~ ' + String(result);
}