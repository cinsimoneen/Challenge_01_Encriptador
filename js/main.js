/**
 * Verifica las CAPS del texto, si hay mayusculas, el return es: 
 *     0 - solo minusuclas, 
 *     1 - solo mayusculas, 
 *     2 - Combinación de mayusculas y minusuclas ,
 *    -1 - Si no cumple con ninguna de las anteriores.
 */

function revisaCaps(textoencriptar) {
  textoencriptar = String(textoencriptar).trim();
  const letra = {
    "lower": /^[a-z0-9 ]+$/,
    "upper": /^[A-Z0-9 ]+$/,
    "upperLower": /^[A-Za-z0-9 ]+$/
  }
 
  if (letra.lower.test(textoencriptar)) return '0';
  if (letra.upper.test(textoencriptar)) return '1';
  if (letra.upperLower.test(textoencriptar)) return '2';
  return -1;

}

// Realiza la encriptación del texto 

function encriptar() {
    let texto = document.getElementById("texto").value;
    let tituloMensaje = document.getElementById("mensaje-salida");
    let parrafo = document.getElementById("parrafo");
    let imgencriptar = document.getElementById("imgencriptar");
      
    let textoCifrado = texto;
    let textoMinusculas=false; // inicializamos, el texto no viene en minusculas
    
    //revisar si el texto contiene puras minusculas y caracteres especiales si no lo convertimos en lowercase
    textoMinusculas=revisaCaps(textoCifrado);
    
    // si el texto tiene mayusculas tratamos de pasarlo a minusculas
    if (textoMinusculas!= 0) {
      textoCifrado=textoCifrado.toLowerCase();
      textoMinusculas=revisaCaps(textoCifrado);
    } 
    
    // verificamos que el texto sea todo minúsculas si tiene acentos o caracteres extraños también devuelve false
    if (textoMinusculas==0)
    { textoCifrado=textoCifrado.replace(/e/gi, "enter")
      textoCifrado=textoCifrado.replace(/i/gi, "imes")
      textoCifrado=textoCifrado.replace(/a/gi, "ai")
      textoCifrado=textoCifrado.replace(/o/gi, "ober")
      textoCifrado=textoCifrado.replace(/u/gi, "ufat");
      //  revisamos que no el texto no este vacio
      if (texto.length != 0) 
      {
        document.getElementById("texto").value = textoCifrado;
        tituloMensaje.textContent = "Texto encriptado con éxito";
        parrafo.textContent = "";
        imgencriptar.src = "./assets/desencriptar.png";
      } else 
      {
        imgencriptar.src = "./assets/encriptar.png";
        tituloMensaje.textContent = "No hay mensaje por encriptar";
        parrafo.textContent = "Ingresa el texto que deseas encriptar o desencriptar";
        swal("Sin texto", "Se debe ingresar un texto", "warning");
      }
    } else
    {  
      // si por alguna razón no se puede convertir a minusculas marca el warning y ya no hace nada 
      swal("Texto incorrecto", "Se debe ingresar un texto en minúsculas sin caracteres especiales", "warning");
    }  
  }
  // desencriptamos el texto que acabamos de encriptar 
  function desencriptar() {
    let texto = document.getElementById("texto").value;
    let tituloMensaje = document.getElementById("mensaje-salida");
    let parrafo = document.getElementById("parrafo");
    let imgencriptar = document.getElementById("imgencriptar");
    //desencriptamos haciendo la operación reversa
    let textoCifrado = texto
    .replace(/enter/gi, "e")
    .replace(/imes/gi, "i")
    .replace(/ai/gi, "a")
    .replace(/ober/gi, "o")
    .replace(/ufat/gi, "u");
    //si el texto no está vacio
    if (texto.length != 0) 
    {
      document.getElementById("texto").value = textoCifrado;
      tituloMensaje.textContent = "Texto desencriptado con éxito";
      parrafo.textContent = "";
      imgencriptar.src ="./assets/encriptar.png";
    } 
    else 
    {
        imgencriptar.src = "./assets/desencriptar.png";
        tituloMensaje.textContent = "Ningún mensaje fue encontrado";
        parrafo.textContent = "Ingresa el texto que deseas encriptar o desencriptar";
        swal("Sin texto!", "Debes ingresar un texto", "warning");
    }
  }
  