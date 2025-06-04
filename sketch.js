// ------------------------------------------------------------------------------------------------------------
// Código completo corregido:
// - Contenido para Época "1980", Subtema "Arte", Partes 1-10 integrado.
// - Contenido para Época "1980", Subtema "Contexto del Chopo", Partes 1-10 integrado.
// - Contenido para Época "1980", Subtema "Cine", Partes 1-10 integrado.
// - Contenido para Época "1980", Subtema "Música", Partes 1-3 integrado (resto por defecto).
// - Contenido para Época "1980", Subtema "Contexto México", Partes 1-10 integrado.
// - Estructura para Época "1980", Subtema "Moda", Partes 1-10 (con contenido por defecto).
// - Contenido para Época "1990", Subtema "Arte", Partes 1-10 (1990-1999) integrado.
// - Contenido para Época "1990", Subtema "Cine", Parte 1 (1990) integrado.
//   (Las Partes 2-4 para Cine 1990s que hicimos antes también están, esta actualiza Part 1 específicamente con el nuevo markdown)
// - Contenido para Época "1990", Subtema "Contexto del Chopo", Partes 1-10 (1990-1999) integrado.
// - Contenido para Época "1990", Subtema "Contexto México", Partes 1-10 (1990-1999) integrado.
// - Contenido para Época "1990", Subtema "Moda", Partes 1-10 (1990-1999) integrado.
// ------------------------------------------------------------------------------------------------------------

console.log("Script cargado. Definiendo variables globales...");

/////////////////////////////////////////////////////////////////////////////////////
// -------------------------------- Variables Globales ------------------------------
/////////////////////////////////////////////////////////////////////////////////////

let textoDelBotonInicio = "inicio";
let esPrimerInicioReal = true;

let botonInicioX, botonInicioY, botonInicioAncho, botonInicioAlto;
let pantallaActual = "inicio";
let historialPantallas = [];
let necesitaBorradoLimpio = false;

let colorPrincipalMoldActual;
let colorAtraidoMoldActual;
let coloresMoldPorEpoca = {};

let gfxMuroConcreto;
let gfxGrietas;
let grietasMuro = [];
let necesitaRedibujarGrietas = false;

let colorTextoNeon, colorFondoBosque;
let btnColFondoNormal, btnColTextoNormal, btnColBordeNormal;
let btnColFondoHover, btnColTextoHover, btnColBordeHover;
let btnColFondoPressed, btnColTextoPressed, btnColBordePressed;
let btnColFondoSelected, btnColTextoSelected, btnColBordeSelected;
let btnStrokeWeight = 1.5;
let btnCornerRadius = 8;

let currentPressedButtonInfo = { type: null, id: null, initialState: null };

let asciiChars = ['*', '-', '+', '.', '~', '^', '/', '%', '$', '#', '@', '!', '&', ':', ';', '=', '?', '_', '|', '<', '>'];
let inicioAsciiParticles = [];
const NUM_INICIO_ASCII_PARTICLES = 70;

let menuHamburguesaAbierto = false;
let menuHamburguesaIconX, menuHamburguesaIconY, menuHamburguesaIconW, menuHamburguesaIconH;
const PANEL_MENU_ANCHO_ORIGINAL = 280;
let menuItems = [];

const SPOTIFY_PLAYLIST_URL = 'https://open.spotify.com/playlist/1onG5ntPDGMD8VMtnPfj57?si=0b8636671ecc43e3';

const contenidoAboutMarca = {
  titulo: "ACERCA DE ALL SYSTEMS",
  parrafo: "ALL SYSTEMS es un colectivo creativo enfocado en la exploración de narrativas digitales y la preservación de la memoria cultural a través de experiencias interactivas. Creemos en el poder de la tecnología para conectar el pasado con el presente, y en la importancia de las subculturas como motores de cambio e identidad.\n\nEste proyecto sobre el Tianguis Cultural del Chopo es un homenaje a su rica historia y a las comunidades que lo han mantenido vivo."
};

let explicacionCajaX, explicacionCajaY, explicacionCajaW, explicacionCajaH;
let explicacionBtnSiguienteX, explicacionBtnSiguienteY, explicacionBtnSiguienteW, explicacionBtnSiguienteH;
let colorMuroFondo, colorMuroMancha1, colorMuroMancha2, colorGrieta, colorAsciiMuro;
let colorExplicacionTitulo, colorExplicacionParrafo;

const contenidoExplicaciones = [
  { tipo: "texto", titulo: "ALL Systems", parrafo: "El siguiente trabajo es un archivero que se reparte por épocas, su principal función es dar a conocer la historia del Tianguis Cultural del Chopo ubicado en la Ciudad de México y de lo que pasaba alrededor desde su fundación hasta la actualidad. Y cómo este espacio cultural y de subculturas (como el Rock and Roll, Punk y lo underground en la Ciudad de México, por decir algunas) fueron el reflejo de una sociedad en creciente cambio y cómo este espacio fue la cuna para la gente amante de la cultura y de las subculturas." },
  { tipo: "texto", titulo: "¿Qué es el Chopo?", parrafo: "El Chopo es un espacio donde la banda va a escuchar música en vivo, comprar vinilos, buscar artículos de sus artistas favoritos, o simplemente estar entre otro tipo de gente. Es más que un simple mercado; para muchos es uno de esos espacios que tiene vida propia y cuyas historias abundan. También podría describirse como: Cambio, Movimiento, Adaptación, Revolución, Trabajo, Marcas locales, Ropa de segunda, vinilos, música en vivo, CDs, Subculturas, estéticas, Personajes, Arte, Diseño, barrio, cholos y fresas, Murales, moda, anécdotas, experiencias, de todo un poco." },
  { tipo: "video", titulo: "", urlVideo: "assets/apertura.mp4" },
  { tipo: "texto", titulo: "¡Pasele Paselee!", parrafo: "Al hacer clic en 'Siguiente', irás a la navegación por épocas.!" }
];
let indiceExplicacionActual = 0;
let miVideo;
let videoCargado = false;

const textosBotonesEpocas = ["1980", "1990", "2000", "2010", "2025"];
let botonEpocaAncho, botonEpocaAlto, espacioHorizontalBotonesEpoca;
let yBarraEpocas;

const NOMBRES_SUB_BOTONES = ["Contexto del Chopo", "Cine", "Arte", "Música", "Contexto México", "Moda"];
let subBotonesInfo = [];
let botonSubTemaAncho, botonSubTemaAlto, espacioVerticalBotonesSubTema;
let xColumnaSubTemas = 450;
let yInicioColumnasVerticales;
let subButtonStyles = [];

const textosBotonesAnoEspecifico = ["Part 1", "Part 2", "Part 3", "Part 4", "Part 5", "Part 6", "Part 7", "Part 8", "Part 9", "Part 10"];
let botonesAnoEspecificoInfo = [];
let puntosDeInteresAdicionales = [];
let botonAnoEspecificoAncho, botonAnoEspecificoAlto, espacioVerticalBotonesAnoEspecifico;
let xColumnaAnosEspecificos;
let epocaSeleccionadaId = -1;
let subTemaSeleccionadoId = -1;
let anoEspecificoSeleccionadoId = -1;
let mostrarContenidoCaja = false;

let contenidoPorAnoEspecifico = [];
let tituloContenidoActual = "";
let descripcionContenidoActual = "";
let urlVideoContenidoActual = "";
let videoContenidoCaja;
let videoContenidoCajaCargado = false;

let botonAtrasX, botonAtrasY, botonAtrasAncho, botonAtrasAlto;
const MARGEN_LATERAL_ATRAS = 20;
const MARGEN_SUPERIOR_ATRAS = 15;
const ALTURA_ICONOS_SUPERIORES = MARGEN_SUPERIOR_ATRAS + 15;

const PADDING_CAJA_TEXTO = 20;
const ANCHO_COLUMNA_OFFSET = 20;
const ALTO_VIDEO_CONTENIDO = 200;
const ESPACIO_ENTRE_ELEMENTOS_CAJA = 15;

let molds = [];
let numMolds = 7000; // Reducido para rendimiento
let d;
let elementoObjetivoMoldes = null;
const RADIO_ATRACCION_BOTON = 1;
const ALPHA_ESTELAS_NEGRO = 15;
const MOUSE_REPEL_RADIUS = 100;
const MOUSE_REPEL_STRENGTH = 2.5;
let moldsEnFaseDeAparicion = false;
let numMoldsVisibles = 0;
const RITMO_APARICION_MOLDS = 50;

// Estado inicial para las épocas: "grandes_centrados_intro" o "barra_superior"
let estadoPresentacionEpocas = "grandes_centrados_intro";
let botonesEpocaGrandesInfo = [];
let botonesEpocaPequeñosInfo = [];
let botonEpocaAnchoOriginal, botonEpocaAltoOriginal;

let firstDrawCall = true;

console.log("Variables globales definidas. Definiendo clases...");

/////////////////////////////////////////////////////////////////////////////////////
// -------------------------------- Clase Mold --------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
class Mold {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.r = 0.7;
    this.heading = random(360);
    this.velocidadBase = random(0.8, 1.5);
    this.vx = cos(this.heading) * this.velocidadBase;
    this.vy = sin(this.heading) * this.velocidadBase;
    this.rotAngle = 45;
    this.stop = false;
    this.rSensorPos = createVector(0, 0);
    this.lSensorPos = createVector(0, 0);
    this.fSensorPos = createVector(0, 0);
    this.sensorAngle = 35;
    this.sensorDist = 9;
    this.estaAtraido = false;
    this.velocidadAtraccion = random(1.5, 2.8);
    this.fuerzaGiroAtraccion = 0.1;
  }

  update() {
    if (this.stop) {
      this.vx = 0;
      this.vy = 0;
      return;
    }

    let steeringForce = createVector(0, 0);
    let mouseDist = dist(this.x, this.y, mouseX, mouseY);

    // Repulsión del mouse
    if (mouseDist < MOUSE_REPEL_RADIUS && mouseDist > 0.01) {
      let repel = createVector(this.x - mouseX, this.y - mouseY);
      repel.setMag(MOUSE_REPEL_STRENGTH * (1 - mouseDist / MOUSE_REPEL_RADIUS));
      steeringForce.add(repel);
    }

    this.estaAtraido = false;

    // Atracción a elementoObjetivoMoldes
    if (elementoObjetivoMoldes) {
      let targetDist = dist(this.x, this.y, elementoObjetivoMoldes.x, elementoObjetivoMoldes.y);
      let targetRadius = (elementoObjetivoMoldes.w ? min(elementoObjetivoMoldes.w, elementoObjetivoMoldes.h) / 2 : RADIO_ATRACCION_BOTON) + 10;
      if (
        targetDist < targetRadius + random(-15, 15) &&
        (steeringForce.magSq() < 0.01 || mouseDist > MOUSE_REPEL_RADIUS * 0.7)
      ) {
        this.estaAtraido = true;
      }
    }

    if (this.estaAtraido && elementoObjetivoMoldes) {
      // Giro suave hacia el objetivo
      let targetAngle = degrees(atan2(elementoObjetivoMoldes.y - this.y, elementoObjetivoMoldes.x - this.x));
      let angleDiff = ((targetAngle - this.heading + 540) % 360) - 180;
      this.heading += angleDiff * this.fuerzaGiroAtraccion;
      this.vx = cos(this.heading) * this.velocidadAtraccion;
      this.vy = sin(this.heading) * this.velocidadAtraccion;

      // Si es subtema (theme_source) y hay puntos de interés, agregamos componente extra
      if (
        elementoObjetivoMoldes.type === 'theme_source' &&
        puntosDeInteresAdicionales &&
        puntosDeInteresAdicionales.length > 0
      ) {
        let distToThemeCenter = dist(this.x, this.y, elementoObjetivoMoldes.x, elementoObjetivoMoldes.y);
        let cercaniaAlTema = elementoObjetivoMoldes.w ? elementoObjetivoMoldes.w * 0.5 : 25;
        if (distToThemeCenter < cercaniaAlTema && puntosDeInteresAdicionales.length > 0) {
          let randomPartTarget = random(puntosDeInteresAdicionales);
          if (randomPartTarget) {
            let angleToPart = degrees(atan2(randomPartTarget.y - this.y, randomPartTarget.x - this.x));
            this.vx += cos(angleToPart) * this.velocidadBase * 0.35;
            this.vy += sin(angleToPart) * this.velocidadBase * 0.35;
            let partAngleDiff = ((angleToPart - this.heading + 540) % 360) - 180;
            this.heading += partAngleDiff * 0.05;
          }
        }
      }
    } else {
      // Sensores para evitar obstáculos (basado en color del fondo)
      this.getSensorPos(this.rSensorPos, this.heading + this.sensorAngle);
      this.getSensorPos(this.lSensorPos, this.heading - this.sensorAngle);
      this.getSensorPos(this.fSensorPos, this.heading);

      let rV = 0, lV = 0, fV = 0;
      if (pixels && pixels.length > 0 && d > 0 && width > 0 && height > 0) {
        let wD = floor(width * d);
        let rI = (floor(this.rSensorPos.y * d) * wD + floor(this.rSensorPos.x * d)) * 4;
        let lI = (floor(this.lSensorPos.y * d) * wD + floor(this.lSensorPos.x * d)) * 4;
        let fI = (floor(this.fSensorPos.y * d) * wD + floor(this.fSensorPos.x * d)) * 4;
        if (
          this.rSensorPos.x >= 0 && this.rSensorPos.x < width &&
          this.rSensorPos.y >= 0 && this.rSensorPos.y < height &&
          rI >= 0 && rI < pixels.length - 3
        ) {
          rV = pixels[rI];
        }
        if (
          this.lSensorPos.x >= 0 && this.lSensorPos.x < width &&
          this.lSensorPos.y >= 0 && this.lSensorPos.y < height &&
          lI >= 0 && lI < pixels.length - 3
        ) {
          lV = pixels[lI];
        }
        if (
          this.fSensorPos.x >= 0 && this.fSensorPos.x < width &&
          this.fSensorPos.y >= 0 && this.fSensorPos.y < height &&
          fI >= 0 && fI < pixels.length - 3
        ) {
          fV = pixels[fI];
        }
      }

      if (fV > lV && fV > rV) {
        // Va derecho
      } else if (lV < fV && rV < fV) {
        // Ambos laterales más oscuros, gira aleatorio
        this.heading += (random(1) < 0.5 ? this.rotAngle : -this.rotAngle);
      } else if (lV > rV) {
        this.heading -= this.rotAngle;
      } else if (rV > lV) {
        this.heading += this.rotAngle;
      }

      this.vx = cos(this.heading) * this.velocidadBase;
      this.vy = sin(this.heading) * this.velocidadBase;

      // Atraer a baricentro de puntos de interés si es subtema
      if (
        elementoObjetivoMoldes &&
        elementoObjetivoMoldes.type === 'theme_source' &&
        puntosDeInteresAdicionales &&
        puntosDeInteresAdicionales.length > 0
      ) {
        let avgX = elementoObjetivoMoldes.x;
        let avgY = elementoObjetivoMoldes.y;
        let count = 1;
        for (let p of puntosDeInteresAdicionales) {
          avgX += p.x;
          avgY += p.y;
          count++;
        }
        if (count > 0) {
          avgX /= count;
          avgY /= count;
          let distToAvg = dist(this.x, this.y, avgX, avgY);
          if (distToAvg > 180) {
            let angleToAvg = degrees(atan2(avgY - this.y, avgX - this.x));
            let steerAngleDiff = ((angleToAvg - this.heading + 540) % 360) - 180;
            this.heading += steerAngleDiff * 0.03;
          }
        }
      }
    }

    // Ajuste de ángulo en [0, 360)
    this.heading = ((this.heading % 360) + 360) % 360;

    // Aplicar steeringForce (repulsión del mouse)
    this.vx += steeringForce.x;
    this.vy += steeringForce.y;

    // Clamping de velocidad
    let speed = mag(this.vx, this.vy);
    let maxSpeed = this.estaAtraido ? 1.3 * this.velocidadAtraccion : 2.5 * this.velocidadBase;
    if (speed > maxSpeed && speed > 0) {
      this.vx = (this.vx / speed) * maxSpeed;
      this.vy = (this.vy / speed) * maxSpeed;
    }

    // Rebotes dentro de la caja de explicación (si estamos en esa pantalla)
    if (pantallaActual === "explicacion" && explicacionCajaW > 0 && explicacionCajaH > 0) {
      let nX = this.x + this.vx;
      let nY = this.y + this.vy;
      let r = this.r;
      let reboto = false;

      // Pared izquierda
      if (
        this.vx < 0 &&
        nX - r < explicacionCajaX &&
        this.x - r >= explicacionCajaX &&
        nY + r > explicacionCajaY &&
        nY - r < explicacionCajaY + explicacionCajaH
      ) {
        this.vx *= -1;
        this.x = explicacionCajaX + r + 0.1;
        reboto = true;
      }
      // Pared derecha
      else if (
        this.vx > 0 &&
        nX + r > explicacionCajaX + explicacionCajaW &&
        this.x + r <= explicacionCajaX + explicacionCajaW &&
        nY + r > explicacionCajaY &&
        nY - r < explicacionCajaY + explicacionCajaH
      ) {
        this.vx *= -1;
        this.x = explicacionCajaX + explicacionCajaW - r - 0.1;
        reboto = true;
      }
      // Pared superior
      if (
        this.vy < 0 &&
        nY - r < explicacionCajaY &&
        this.y - r >= explicacionCajaY &&
        nX + r > explicacionCajaX &&
        nX - r < explicacionCajaX + explicacionCajaW
      ) {
        this.vy *= -1;
        this.y = explicacionCajaY + r + 0.1;
        reboto = true;
      }
      // Pared inferior
      else if (
        this.vy > 0 &&
        nY + r > explicacionCajaY + explicacionCajaH &&
        this.y + r <= explicacionCajaY + explicacionCajaH &&
        nX + r > explicacionCajaX &&
        nX - r < explicacionCajaX + explicacionCajaW
      ) {
        this.vy *= -1;
        this.y = explicacionCajaY + explicacionCajaH - r - 0.1;
        reboto = true;
      }

      if (reboto && (this.vx !== 0 || this.vy !== 0)) {
        this.heading = degrees(atan2(this.vy, this.vx));
      }
    }

    // Wrap-around en bordes
    this.x = (this.x + this.vx + width * 2) % width;
    this.y = (this.y + this.vy + height * 2) % height;
  }

  display() {
    noStroke();
    if (this.estaAtraido) {
      if (colorAtraidoMoldActual) fill(colorAtraidoMoldActual);
      else fill(60, 150, 255, 255);
    } else {
      if (colorPrincipalMoldActual) fill(colorPrincipalMoldActual);
      else fill(255, 255, 255, 255);
    }
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  getSensorPos(v, a) {
    v.x = this.x + this.sensorDist * cos(a);
    v.y = this.y + this.sensorDist * sin(a);
  }
}

console.log("Clases definidas. Definiendo funciones auxiliares...");

/////////////////////////////////////////////////////////////////////////////////////
// ------------- Funciones Auxiliares para Parche y Textura de Muro ---------------
/////////////////////////////////////////////////////////////////////////////////////

function calcularVerticesParcheEstables(pw, ph, iF = 0.08, nSO = 0) {
  let tV = [];
  let bP = [
    createVector(0, ph * 0.25),
    createVector(pw * 0.1, ph * 0.1),
    createVector(pw * 0.25, 0),
    createVector(pw * 0.5, 0),
    createVector(pw * 0.75, 0),
    createVector(pw * 0.9, ph * 0.1),
    createVector(pw, ph * 0.25),
    createVector(pw, ph * 0.5),
    createVector(pw, ph * 0.75),
    createVector(pw * 0.9, ph * 0.9),
    createVector(pw * 0.75, ph),
    createVector(pw * 0.5, ph),
    createVector(pw * 0.25, ph),
    createVector(pw * 0.1, ph * 0.9),
    createVector(0, ph * 0.75),
    createVector(0, ph * 0.5)
  ];
  let lB = bP[bP.length - 1];
  let fB = bP[0];
  let sB = bP[1];

  // Vértice inicial perturbado
  tV.push(
    createVector(
      lB.x + (noise(nSO + 300) - 0.5) * 2 * pw * iF,
      lB.y + (noise(nSO + 400) - 0.5) * 2 * ph * iF
    )
  );

  // Generar puntos alrededor del borde con ruido
  for (let i = 0; i < bP.length; i++) {
    let p = bP[i].copy();
    let nX = (noise(nSO + i * 0.5) - 0.5) * 2;
    let nY = (noise(nSO + 100 + i * 0.5) - 0.5) * 2;
    p.x += nX * pw * iF;
    p.y += nY * ph * iF;
    tV.push(p);
  }

  // Últimos vértices del borde con ruido
  tV.push(
    createVector(
      fB.x + (noise(nSO + 500) - 0.5) * 2 * pw * iF,
      fB.y + (noise(nSO + 600) - 0.5) * 2 * ph * iF
    )
  );
  tV.push(
    createVector(
      sB.x + (noise(nSO + 700) - 0.5) * 2 * pw * iF,
      sB.y + (noise(nSO + 800) - 0.5) * 2 * ph * iF
    )
  );

  return tV;
}

function dibujarTexturaMuroEnGraphics(pg, w, h) {
  if (!pg || !colorMuroFondo || !colorMuroMancha1 || !colorMuroMancha2 || !colorAsciiMuro) {
    if (pg) pg.background(128);
    return;
  }

  pg.push();
  pg.background(colorMuroFondo);
  pg.noStroke();

  // Manchas
  let nM = constrain(20 + floor(w * h * 0.00005), 10, 50);
  for (let i = 0; i < nM; i++) {
    let mX = pg.random(w);
    let mY = pg.random(h);
    let mS = pg.random(w * 0.05, w * 0.25);
    let mCB = (i % 2 === 0) ? colorMuroMancha1 : colorMuroMancha2;
    if (mCB && typeof red === 'function') {
      pg.fill(red(mCB), green(mCB), blue(mCB), pg.random(8, 30));
      pg.ellipse(mX, mY, mS, mS * pg.random(0.5, 1.5));
    }
  }

  // Líneas y puntos de ruido
  pg.strokeWeight(0.25);
  let nLR = constrain(floor(w * 0.2 + h * 0.2), 30, 150);
  for (let i = 0; i < nLR; i++) {
    if (colorMuroFondo && typeof red === 'function') {
      let rC = red(colorMuroFondo) + random(-15, 15);
      let gC = green(colorMuroFondo) + random(-15, 15);
      let bC = blue(colorMuroFondo) + random(-15, 15);
      pg.stroke(rC, gC, bC, pg.random(10, 30));
      if (i % 2 === 0) {
        pg.line(pg.random(w), pg.random(h), pg.random(w) + pg.random(-10, 10), pg.random(h) + pg.random(-10, 10));
      } else {
        pg.point(pg.random(w), pg.random(h));
      }
    }
  }

  // Caracteres ASCII en el muro
  if (asciiChars && asciiChars.length > 0 && colorAsciiMuro && typeof red === 'function') {
    let nAM = constrain(floor(w * h * 0.0001), 5, 30);
    pg.textFont('monospace', 6);
    pg.textAlign(CENTER, CENTER);
    for (let i = 0; i < nAM; i++) {
      pg.fill(red(colorAsciiMuro), green(colorAsciiMuro), blue(colorAsciiMuro), alpha(colorAsciiMuro));
      pg.text(random(asciiChars), pg.random(w), pg.random(h));
    }
  }

  pg.pop();
}

/////////////////////////////////////////////////////////////////////////////////////
// ----------------------- Nueva Función Genérica para Botones ----------------------
/////////////////////////////////////////////////////////////////////////////////////
function drawStyledButton(x, y, w, h, label, state, textSizeFactor = 0.4, customFont = 'Arial') {
  push();

  let bgFill, txtFill, bordeStroke;
  switch (state) {
    case "pressed":
      bgFill = btnColFondoPressed;
      txtFill = btnColTextoPressed;
      bordeStroke = btnColBordePressed;
      break;
    case "selected":
      bgFill = btnColFondoSelected;
      txtFill = btnColTextoSelected;
      bordeStroke = btnColBordeSelected;
      break;
    case "hover":
      bgFill = btnColFondoHover;
      txtFill = btnColTextoHover;
      bordeStroke = btnColBordeHover;
      break;
    case "normal":
    default:
      bgFill = btnColFondoNormal;
      txtFill = btnColTextoNormal;
      bordeStroke = btnColBordeNormal;
      break;
  }

  strokeWeight(btnStrokeWeight);
  stroke(bordeStroke);
  fill(bgFill);
  rect(x, y, w, h, btnCornerRadius);

  noStroke();
  fill(txtFill);
  textAlign(CENTER, CENTER);
  let textSizeVal = constrain(h * textSizeFactor, 10, h * 0.6);
  textFont(customFont, textSizeVal);
  text(label, x + w / 2, y + h / 2 + textSizeVal * 0.05);

  pop();
}

function drawYearButtonInteractionEffect(x, y, w, h, intData, isHovSel) {
  if (!isHovSel || !intData || !intData.type) return;

  push();
  if (intData.type === 'tendrilBorder' && intData.colorActive) {
    stroke(intData.colorActive);
    strokeWeight(1.2);
    noFill();
    let s = 3 + floor(sin(frameCount * 2) * 2);
    for (let c = 0; c < s; c++) {
      let S = x + randomGaussian(w / 2, w / 4),
        A = y + randomGaussian(h / 2, h / 4),
        L = S + random(-w * 0.2, w * 0.2),
        C = A + random(-h * 0.2, h * 0.2),
        _ = S + random(-w * 0.2, w * 0.2),
        B = A + random(-h * 0.2, h * 0.2),
        D = x + randomGaussian(w / 2, w / 3),
        O = y + randomGaussian(h / 2, h / 3);
      if (dist(S, A, D, O) < min(w, h) * 0.3) {
        bezier(S, A, L, C, _, B, D, O);
      }
    }
  } else if (intData.type === 'sprocketIcon' && intData.colorDark) {
    fill(intData.colorDark);
    noStroke();
    let s = min(w, h) * 0.2, c = 5;
    rect(x + w - s - c, y + c, s * 0.3, s, 1);
    rect(x + w - s * 0.7 - c, y + c, s * 0.3, s, 1);
    if (intData.colorLight) {
      fill(intData.colorLight);
      ellipse(x + w - s * 0.5 - c, y + c + s / 2, s * 0.5, s * 0.5);
    }
  } else if (intData.type === 'colorSplotch' && intData.colors && intData.colors.length > 0) {
    noStroke();
    let col = random(intData.colors);
    if (col) {
      fill(red(col), green(col), blue(col), 120);
      ellipse(x + w * random(0.3, 0.7), y + h * random(0.3, 0.7), w * 0.2, h * 0.2);
    }
  } else if (intData.type === 'waveLine' && intData.colorLine) {
    stroke(intData.colorLine);
    strokeWeight(1.5);
    noFill();
    beginShape();
    for (let s = 0; s <= w * 0.8; s += 4) {
      vertex(
        x + w * 0.1 + s,
        y + h * 0.75 + sin(s * (360 / (w * 0.8)) + frameCount * 4) * h * 0.05
      );
    }
    endShape();
  } else if (intData.type === 'mexicanPattern' && intData.colors && intData.colors.length > 0) {
    noStroke();
    for (let s = 0; s < 2; s++) {
      let c = random(intData.colors);
      if (c) {
        fill(c);
        let S = min(w, h) * 0.15,
          A = x + (s === 0 ? S : w - 1.5 * S),
          L = y + (s === 0 ? S : h - 1.5 * S);
        triangle(A, L, A + S, L, A + S / 2, L - S);
      }
    }
  } else if (intData.type === 'stitchMark' && intData.colorStitch) {
    stroke(intData.colorStitch);
    strokeWeight(1.5);
    let s = 5, c = 7;
    line(x + s, y + s, x + s + c, y + s);
    line(x + s, y + s, x + s, y + s + c);
    line(x + w - s, y + h - s, x + w - s - c, y + h - s);
    line(x + w - s, y + h - s, x + w - s, y + h - s - c);
  }
  pop();
}

console.log("Funciones auxiliares y de botones definidas. Iniciando setup...");

/////////////////////////////////////////////////////////////////////////////////////
// -------------------- Inicializar Estilos de Botones -----------------------------
/////////////////////////////////////////////////////////////////////////////////////
function inicializarEstilosBotones() {
  colorTextoNeon = color('#97e615');
  colorFondoBosque = color('#022601');

  btnColFondoNormal = colorFondoBosque;
  btnColTextoNormal = colorTextoNeon;
  btnColBordeNormal = colorTextoNeon;

  btnColFondoHover = lerpColor(colorFondoBosque, color(40, 70, 40), 0.5);
  btnColTextoHover = lerpColor(colorTextoNeon, color(200, 255, 200), 0.5);
  btnColBordeHover = btnColTextoHover;

  btnColFondoPressed = colorTextoNeon;
  btnColTextoPressed = colorFondoBosque;
  btnColBordePressed = colorTextoNeon;

  btnColFondoSelected = lerpColor(colorTextoNeon, color(230, 255, 230), 0.3);
  btnColTextoSelected = colorFondoBosque;
  btnColBordeSelected = btnColFondoSelected;

  btnStrokeWeight = 2;
  btnCornerRadius = 6;
}

/////////////////////////////////////////////////////////////////////////////////////
// ------------------------------------- setup() -------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
function setup() {
  console.log("Iniciando setup()...");
  try {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    cnv.position(0, 0);
    cnv.style('z-index', '-1');

    angleMode(DEGREES);
    textAlign(CENTER, CENTER);
    if (typeof pixelDensity === 'function') {
      pixelDensity(1);
      d = pixelDensity();
    } else {
      d = 1;
    }

    inicializarEstilosBotones();

    // Configurar colores de motas por época
    coloresMoldPorEpoca = {
      "default": { principal: color(220, 220, 255, 200), atraido: color(240, 240, 255, 255) },
      "1980":    { principal: color(255, 0, 255, 200),   atraido: color(255, 100, 255, 255) },
      "1990":    { principal: color(0, 255, 255, 200),   atraido: color(100, 255, 255, 255) },
      "2000":    { principal: color(255, 255, 0, 200),   atraido: color(255, 255, 100, 255) },
      "2010":    { principal: color(255, 100, 0, 200),   atraido: color(255, 150, 50, 255) },
      "2025":    { principal: color(150, 255, 150, 200), atraido: color(200, 255, 200, 255) }
    };
    actualizarColoresMoldPorEpoca(-1);

    // Menú hamburguesa
    menuHamburguesaIconW = 45;
    menuHamburguesaIconH = 35;
    menuItems = [
      { label: "Explicación", action: "ir_explicacion", id: "menu_explicacion" },
      { label: "Épocas", action: "ir_epocas", id: "menu_epocas" },
      { label: "Spotify", action: "abrir_spotify", id: "menu_spotify" },
      { label: "About ALL SYSTEMS", action: "ver_about_marca", id: "menu_about" }
    ];

    // Ocultar cualquier contenedor HTML de explicación si existía
    let tempElem;
    tempElem = select('#explicacionContenedor');
    if (tempElem) tempElem.hide();
    tempElem = select('#explicacionTitulo');
    if (tempElem) tempElem.hide();
    tempElem = select('#explicacionVideoContenedor');
    if (tempElem) tempElem.hide();
    tempElem = select('#explicacionParrafo');
    if (tempElem) tempElem.hide();
    tempElem = select('#explicacionSiguienteBtn');
    if (tempElem) tempElem.hide();

    // Dimensiones y posicionamiento para botones de época
    botonEpocaAnchoOriginal = 180;  // Ahora más grande inicialmente para el estado “grandes_centrados_intro”
    botonEpocaAltoOriginal  = 80;   // Ahora más grande inicialmente
    espacioHorizontalBotonesEpoca = 10;
    botonSubTemaAncho = 260;
    botonSubTemaAlto = 45;
    espacioVerticalBotonesSubTema = 8;
    botonAnoEspecificoAncho = 90;
    botonAnoEspecificoAlto = 35;
    espacioVerticalBotonesAnoEspecifico = 4;

    // Barra fija arriba (yBarraEpocas)
    yBarraEpocas = ALTURA_ICONOS_SUPERIORES + 25;
    yInicioColumnasVerticales = yBarraEpocas + botonEpocaAltoOriginal + 30;
    xColumnaSubTemas = 60;

    if (width > 0 && height > 0) {
      // Calcular botones pequeños (barra superior)
      let anTB = textosBotonesEpocas.length * botonEpocaAnchoOriginal +
                   (textosBotonesEpocas.length - 1) * espacioHorizontalBotonesEpoca;
      let xIB = (width - anTB) / 2;
      for (let i = 0; i < textosBotonesEpocas.length; i++) {
        botonesEpocaPequeñosInfo[i] = {
          x: xIB + i * (botonEpocaAnchoOriginal + espacioHorizontalBotonesEpoca),
          y: yBarraEpocas,
          w: botonEpocaAnchoOriginal,
          h: botonEpocaAltoOriginal
        };
      }

      // Calcular botones grandes (centrados para la introducción), asegurando que entren dentro del ancho
      const n = textosBotonesEpocas.length;
      const totalSpacing = (n - 1) * espacioHorizontalBotonesEpoca;
      // Opción 1: tamaño fijo máximo
      let maxGW = width * 0.18;
      // Opción 2: tamaño para que quepan todos
      let fitGW = (width - totalSpacing) / n;
      let gW = min(maxGW, fitGW);
      let gH = gW * (botonEpocaAltoOriginal / botonEpocaAnchoOriginal);
      let totalWidth = n * gW + totalSpacing;
      let xIG = (width - totalWidth) / 2;
      let yG = height / 2 - gH / 2;
      for (let i = 0; i < textosBotonesEpocas.length; i++) {
        botonesEpocaGrandesInfo[i] = {
          x: xIG + i * (gW + espacioHorizontalBotonesEpoca),
          y: yG,
          w: gW,
          h: gH
        };
      }
    } else {
      console.warn("width/height no definidas");
    }

    // Colores de muro y explicación
    colorMuroFondo = color(40, 40, 35);
    colorMuroMancha1 = color(50, 50, 45);
    colorMuroMancha2 = color(30, 30, 25);
    colorGrieta = color(10, 10, 8, 180);
    colorAsciiMuro = color(30, 30, 25, 30);

    colorExplicacionTitulo = color(235, 235, 220);
    colorExplicacionParrafo = color(20, 20, 20);

    botonAtrasAncho = 50;
    botonAtrasAlto = 35;

    // Estilos de sub-botones
    subButtonStyles = [
      {
        id: NOMBRES_SUB_BOTONES[0], // Contexto del Chopo
        yearInteraction: { type: 'tendrilBorder', colorActive: btnColTextoNormal }
      },
      {
        id: NOMBRES_SUB_BOTONES[1], // Cine
        yearInteraction: { type: 'sprocketIcon', colorDark: colorFondoBosque, colorLight: btnColTextoNormal }
      },
      {
        id: NOMBRES_SUB_BOTONES[2], // Arte
        yearInteraction: { type: 'colorSplotch', colors: [color(255, 100, 100, 150), color(100, 255, 100, 150), color(100, 100, 255, 150)] }
      },
      {
        id: NOMBRES_SUB_BOTONES[3], // Música
        yearInteraction: { type: 'waveLine', colorLine: btnColTextoNormal }
      },
      {
        id: NOMBRES_SUB_BOTONES[4], // Contexto México
        yearInteraction: { type: 'mexicanPattern', colors: [color(255, 200, 0, 180), color(0, 150, 130, 180), color(220, 50, 80, 180)] }
      },
      {
        id: NOMBRES_SUB_BOTONES[5], // Moda
        yearInteraction: { type: 'stitchMark', colorStitch: btnColTextoNormal }
      }
    ];

    // Inicializar motas (partículas “Mold”)
    molds = [];
    if (width > 0 && height > 0) {
      for (let i = 0; i < numMolds; i++) {
        molds.push(new Mold());
      }
    }

    // Video de la diapositiva (si existe)
    const videoSlideData = contenidoExplicaciones.find(s => s.tipo === 'video');
    if (videoSlideData && videoSlideData.urlVideo) {
      miVideo = createVideo(videoSlideData.urlVideo, () => {
        videoCargado = true;
        if (miVideo) {
          miVideo.volume(0.05);
          miVideo.hide();
        }
      });
      if (miVideo) miVideo.hide();
    }

    // Contenido jerárquico [época][subtema][parte]
    contenidoPorAnoEspecifico = [];
    for (let i = 0; i < textosBotonesEpocas.length; i++) {
      let epocasData = [];
      for (let j = 0; j < NOMBRES_SUB_BOTONES.length; j++) {
        let subTemasData = [];
        for (let k = 0; k < textosBotonesAnoEspecifico.length; k++) {

          let tituloDelContenidoEspecifico = "";
          let urlDelVideoEspecifico = null;
          let descripcionDelContenidoEspecifico = "";
          let contenidoDefinido = false; // Bandera para saber si se asignó contenido específico

          // --- INICIO DE LA INTEGRACIÓN DE CONTENIDO PARA ÉPOCA "1980" ---
          if (textosBotonesEpocas[i] === "1980") {
            // SUBTEMA: Contexto del Chopo
            if (NOMBRES_SUB_BOTONES[j] === "Contexto del Chopo") {
              if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 1980
                tituloDelContenidoEspecifico = "Chopo: Inicios (1980)";
                urlDelVideoEspecifico = "assets/con chop1.mp4";
                descripcionDelContenidoEspecifico = "- El Tianguis Cultural del Chopo inicia en el Museo Universitario del Chopo un 4 de octubre como el \"Primer Tianguis de la Música\". Fue una iniciativa de Jorge Pantoja y Ángeles Mastretta, originalmente planeado para durar solo un mes. El objetivo era crear un espacio de comunicación entre coleccionistas y amantes de la música.\\n- El evento tuvo éxito y se extendió por dos años dentro de las instalaciones del museo, ubicado en la colonia Santa María la Ribera. Durante este tiempo, se estableció en la calle Enrique González Martínez, antes conocida como Chopo, de donde tomó su nombre.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 1981
                tituloDelContenidoEspecifico = "Chopo: Consolidación (1981)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Se extiende su duración debido al éxito de asistencia; comienza a consolidarse como espacio semanal de intercambio.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 1982
                tituloDelContenidoEspecifico = "Chopo: A la Calle (1982)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Debido a la falta de espacio en el museo, el tianguis se traslada a las aceras de la calle Dr. Enrique González Martínez. Jóvenes entusiastas del rock comenzaron a intercambiar y vender discos, carteles, fanzines, artesanías y libros de manera espontánea.\\n\\nLa calle se convirtió en un punto de encuentro para diversas expresiones rockeras y contraculturales en la Ciudad de México. Llegaron bandas de punk y metal, así como jóvenes de la periferia urbana.\\n\\nEl ambiente era anárquico, sin líderes ni cuotas impuestas, con la única regla aparente de respeto a la autonomía de cada quien.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 1983
                tituloDelContenidoEspecifico = "Chopo: Crecimiento (1983)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Aumenta el número de puestos; se consolida como punto de encuentro de punks, metaleros y melómanos.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 1984
                tituloDelContenidoEspecifico = "Chopo: Referente Contracultural (1984)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Se vuelve referente contracultural, influenciado por la efervescencia del rock en tu idioma.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 1985
                tituloDelContenidoEspecifico = "Chopo: Desalojo e Inicio del Nomadismo (1985)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "- Agosto: El tianguis fue desalojado de la calle González Martínez por la delegación Cuauhtémoc. Esto marcó el inicio de un periodo de nomadismo.\\n- Tras el desalojo, el Tianguis se ubicó temporalmente en un estacionamiento en San Rafael.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 1986
                tituloDelContenidoEspecifico = "Chopo: Periodo Nómada (1986)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "El Tianguis continuó su periodo de nomadismo, trasladándose al Casco de Santo Tomás.\\nPosteriormente, se ubicó en el estacionamiento de la Facultad de Arquitectura de la UNAM. También tuvo una breve estancia en el Kiosco Morisco de la Alameda de Santa María la Ribera durante dos sábados (5 y 12 de julio).\\nSe menciona un incidente en este año donde se contrató a delincuentes de la calle Nopal para golpear y disolver el tianguis, lo que obligó a trasladarse a un estacionamiento en Insurgentes y San Cosme.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 8") { // Año 1987
                tituloDelContenidoEspecifico = "Chopo: Establecimiento en Aldama (1987)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "El Tianguis se estableció en su ubicación actual en la calle Aldama, junto a la estación de trenes de Buenavista (que más tarde se convertiría en la Biblioteca José Vasconcelos y la estación del Tren Suburbano).";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 9") { // Año 1988
                tituloDelContenidoEspecifico = "Chopo: Formalización y Conflictos (1988)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Se formaliza su ubicación en Aldama con autorización oficial el 24 de febrero.\\n\\nSe reportaron conflictos internos relacionados con el liderazgo y la imposición de reglas, lo que llevó a desalojos y agresiones.\\n\\nLa década de 1988-1998 es considerada por algunos como la \"edad dorada\" del Tianguis, enfocada en el rock y otras expresiones artísticas.\\nDesde su creación, ha sido un importante referente cultural en México, donde convergen numerosas propuestas no comerciales y alternativas de la escena musical.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 10") { // Año 1989
                tituloDelContenidoEspecifico = "Chopo: Fanzines y Colectivos (1989)";
                urlDelVideoEspecifico = "assets/musica.mp4";
                descripcionDelContenidoEspecifico = "Surgen los primeros fanzines del Chopo; nacen colectivos de documentación underground.";
                contenidoDefinido = true;
              }
            }
            // SUBTEMA: Cine
            else if (NOMBRES_SUB_BOTONES[j] === "Cine") {
              if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 1980
                tituloDelContenidoEspecifico = "Cine Mexicano: Panorama y Crisis (1980)";
                urlDelVideoEspecifico = "assets/con chopo 4.mp4";
                descripcionDelContenidoEspecifico = "Contexto General (1980-2024):\\nEl cine mexicano experimentó una metamorfosis radical, pasando de un modelo estatalista y el cine de ficheras, por crisis económicas, hasta un \"Nuevo Cine Mexicano\" y visibilidad global. El Premio Ariel reconoce lo mejor del cine mexicano desde 1946.\\n\\nCrisis y Transición (Años 80):\\nLos ochenta iniciaron con crisis económica y agotamiento de modelos. El cine de ficheras declinaba, y la industria enfrentó inestabilidad en el sexenio de Miguel de la Madrid (1982-1988). Productores privados priorizaron rentabilidad con géneros de bajo presupuesto (ficheras, mojados, narcotraficantes). El Estado creó IMCINE en 1983, pero con limitaciones. Iniciativas como el Tercer Concurso de Cine Experimental (1985) y el Plan de Renovación Cinematográfica (1986) tuvieron implementación débil. El video casero transformó el consumo. A pesar del panorama, hubo producción de calidad y México fue destino de maquila para Hollywood.\\n\\nPelículas Destacadas (1980):\\nPremios Ariel (XXII ed., para 1979): \"El año de la peste\" (Dir. Felipe Cazals) - Mejor Película y Director.\\n- El año de la peste (Dir. Felipe Cazals)\\n- El infierno de todos tan temido (Dir. Sergio Olhovich)\\n- Fuego en el mar (Dir. Raúl Araiza)\\n- La tía Alejandra (Dir. Arturo Ripstein)\\n- Perro callejero (Dir. Gilberto Gazcón)\\n- Max Domino (Ópera Prima, Dir. Gerardo Pardo)\\n- La viuda de Montiel (Dir. Miguel Littin)\\n- Crónica íntima (Ópera Prima, Dir. Claudio Isaac)\\n- En la cuerda del hambre (Dir. Gustavo Alatriste)\\n- Mar asesino (Documental, Dir. Ramón Bravo)\\n- Música silenciada (Documental, Dir. Andrea Oliva)";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 1981
                tituloDelContenidoEspecifico = "Cine Mexicano: Tensión Creativa (1981)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "La producción continúa mostrando la tensión entre cine de autor y fórmulas comerciales. Premios Ariel (XXIII ed., para 1980): \"Las grandes aguas\" (Dir. Servando González). \"Misterio\" (Dir. Marcela Fernández Violante) también fue reconocida.\\n\\nPelículas Destacadas:\\n- Las grandes aguas (Dir. Servando González)\\n- Misterio (Dir. Marcela Fernández Violante)\\n- Morir de madrugada (Dir. Julián Pastor)\\n- Lagunilla mi barrio (Dir. Raúl Araiza)\\n- El gran perro muerto (Dir. Rogelio A. González)\\n- La seducción (Dir. Arturo Ripstein)\\n- Rastro de muerte (Dir. Arturo Ripstein)\\n- Que viva Tepito! (Dir. Mario Hernández)\\n- Fabricantes de pánico (Dir. René Cardona Jr.)\\n- Ángela Morante, ¿crimen o suicidio? (Dir. José Estrada)";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 1982
                tituloDelContenidoEspecifico = "Cine Mexicano: Crisis Agudizada (1982)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Inicio del sexenio de Miguel de la Madrid y agudización de la crisis económica. Premios Ariel (XXIV ed., para 1981): \"Ora sí ¡tenemos que ganar!\" (Dir. Raúl Kamffer), producción CUEC-UNAM.\\n\\nPelículas Destacadas:\\n- Ora sí ¡tenemos que ganar! (Dir. Raúl Kamffer)\\n- Llámenme Mike (Dir. Alfredo Gurrola)\\n- Noche de carnaval (Dir. Mario Hernández)\\n- El día que murió Pedro Infante (Dir. Claudio Isaac)\\n- Semana Santa en Acapulco (Dir. Luis Alcoriza)\\n- El caballito volador (Dir. Alfredo Joskowicz)\\n- La combi asesina (Dir. Alberto Mariscal)\\n- Aquel famoso Remington (Dir. Gustavo Alatriste)\\n- Retrato de una mujer casada (Dir. Alberto Bojórquez)\\n- La leyenda de Rodrigo (Dir. Julián Pastor)";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 1983
                tituloDelContenidoEspecifico = "Cine Mexicano: Creación de IMCINE (1983)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Se crea el IMCINE. Premios Ariel (XXV ed., para 1982): Categoría Mejor Película declarada desierta. José Estrada ganó Mejor Director por \"La pachanga\". \"La víspera\" (Dir. Alejandro Pelayo) también reconocida.\\n\\nPelículas Destacadas:\\n- La pachanga (Dir. José Estrada)\\n- La víspera (Ópera Prima, Dir. Alejandro Pelayo)\\n- Días de combate (Dir. Alfredo Gurrola)\\n- Tiempo de lobos (Dir. Alberto Isaac)\\n- Confidencias (Dir. Jaime Humberto Hermosillo)\\n- Bajo la metralla (Dir. Felipe Cazals)\\n- El corazón de la noche (Dir. Jaime Humberto Hermosillo)\\n- Los renglones torcidos de Dios (Dir. Tulio Demicheli)\\n- El escarabajo (Dir. Lisandro Duque Naranjo)\\n- Antonieta (Dir. Carlos Saura)";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 1984
                tituloDelContenidoEspecifico = "Cine Mexicano: Persiste la Crisis (1984)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "La crisis económica persiste. Premios Ariel (XXVI ed., para 1983): \"Bajo la metralla\" (Dir. Felipe Cazals) - Mejor Película y Director. \"Nocaut\" (Ópera Prima, Dir. José Luis García Agraz) reconocida.\\n\\nPelículas Destacadas:\\n- Bajo la metralla (Dir. Felipe Cazals)\\n- La viuda negra (Dir. Arturo Ripstein)\\n- Nocaut (Ópera Prima, Dir. José Luis García Agraz)\\n- El diablo y la dama (Dir. Ariel Zúñiga)\\n- El tonto que hacía milagros (Dir. Mario Hernández)\\n- Motel (Dir. Luis Mandoki)\\n- Frida, naturaleza viva (Dir. Paul Leduc)\\n- Las apariencias engañan (Dir. Jaime Humberto Hermosillo)\\n- El Norte (Dir. Gregory Nava)\\n- Eréndira (Dir. Ruy Guerra)";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 1985
                tituloDelContenidoEspecifico = "Cine Mexicano: Cine Experimental (1985)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Se realiza el Tercer Concurso de Cine Experimental. Premios Ariel (XXVII ed., para 1984): \"Frida, naturaleza viva\" (Dir. Paul Leduc) - Mejor Película y Director. \"Vidas errantes\" (Ópera Prima, Dir. Juan Antonio de la Riva) destacada.\\n\\nPelículas Destacadas:\\n- Frida, naturaleza viva (Dir. Paul Leduc)\\n- Vidas errantes (Ópera Prima, Dir. Juan Antonio de la Riva)\\n- De veras me atrapaste (Dir. Gerardo Pardo)\\n- Los motivos de Luz (Dir. Felipe Cazals)\\n- El otro (Dir. Arturo Ripstein)\\n- Terror y encajes negros (Dir. Luis Alcoriza)\\n- Doña Herlinda y su hijo (Dir. Jaime Humberto Hermosillo)\\n- El hombre de la mandolina (Dir. Gonzalo Martínez Ortega)\\n- Historias violentas (Varios Directores)\\n- Redondo (Ópera Prima, Dir. Raúl Busteros)";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 1986
                tituloDelContenidoEspecifico = "Cine Mexicano: Plan de Renovación (1986)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Se anuncia el Plan de Renovación Cinematográfica y la institucionalización del cine experimental. Premios Ariel (XXVIII ed., para 1985): \"Veneno para las hadas\" (Dir. Carlos Enrique Taboada) - Mejor Película y Director.\\n\\nPelículas Destacadas:\\n- Veneno para las hadas (Dir. Carlos Enrique Taboada)\\n- Los motivos de Luz (Dir. Felipe Cazals)\\n- El escuadrón de la muerte (Dir. Alfredo Gurrola)\\n- Redondo (Dir. Raúl Busteros)\\n- El tres de copas (Dir. Felipe Cazals)\\n- El maleficio II (Dir. Raúl Araiza)\\n- Chido Guan, el tacos de oro (Dir. Alfonso Arau)\\n- El imperio de la fortuna (Dir. Arturo Ripstein)\\n- El narco (Duelo Rojo) (Ópera Prima, Dir. Alfonso Pérez Reguera (Alfonso de Alva))\\n- Memoriales perdidos (Dir. Jaime Casillas)";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 8") { // Año 1987
                tituloDelContenidoEspecifico = "Cine Mexicano: Obras Notables (1987)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "La crisis y la baja calidad persisten, aunque surgen algunas obras notables. Premios Ariel (XXIX ed., para 1986): \"El imperio de la fortuna\" (Dir. Arturo Ripstein) - Mejor Película y Director.\\n\\nPelículas Destacadas:\\n- El imperio de la fortuna (Dir. Arturo Ripstein)\\n- Amor a la vuelta de la esquina (Ópera Prima, Dir. Alberto Cortés)\\n- Crónica de familia (Ópera Prima, Dir. Diego López Rivera)\\n- Obdulia (Dir. Juan Antonio de la Riva)\\n- Los confines (Dir. Mitl Valdez)\\n- Mariana, Mariana (Dir. Alberto Isaac)\\n- Lo que importa es vivir (Dir. Luis Alcoriza)\\n- Ulama, el juego de la vida y la muerte (Documental, Ópera Prima, Dir. Roberto Rochín)\\n- Astucia (Dir. Mario Hernández)\\n- Asesinato en la plaza Garibaldi (Dir. Alberto Isaac)";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 9") { // Año 1988
                tituloDelContenidoEspecifico = "Cine Mexicano: Fin de Sexenio (1988)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Último año del sexenio de De la Madrid. Premios Ariel (XXX ed., para 1987): \"Mariana, Mariana\" (Dir. Alberto Isaac) - Mejor Película y Director.\\n\\nPelículas Destacadas:\\n- Mariana, Mariana (Dir. Alberto Isaac)\\n- Lo que importa es vivir (Dir. Luis Alcoriza)\\n- Días difíciles (Dir. Alejandro Pelayo)\\n- Muelle rojo (Dir. José Luis Urquieta)\\n- Nocturno amor que te vas (Dir. Marcela Fernández Violante)\\n- El último túnel (Dir. Servando González)\\n- Los confines (Ópera Prima, Dir. Mitl Valdez)\\n- Esperanza (Dir. Sergio Olhovich)\\n- El secreto de Romelia (Ópera Prima, Dir. Busi Cortés)\\n- Zapata en Chinameca (Dir. Mario Hernández)";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 10") { // Año 1989
                tituloDelContenidoEspecifico = "Cine Mexicano: Inicio de Sexenio Salinas (1989)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Inicio del sexenio de Carlos Salinas de Gortari. Premios Ariel (XXXI ed., para 1988): \"Esperanza\" (Dir. Sergio Olhovich) - Mejor Película y Director.\\n\\nPelículas Destacadas:\\n- Esperanza (Dir. Sergio Olhovich)\\n- Intriga contra México ¿Nos traicionará el presidente? (Dir. Fernando Pérez Gavilán)\\n- La jaula de oro (Dir. Sergio Véjar)\\n- Mentiras piadosas (Dir. Arturo Ripstein)\\n- El jinete de la divina providencia (Dir. Óscar Blancarte)\\n- Camino largo a Tijuana (Ópera Prima, Dir. Luis Estrada)\\n- Goitia, un dios para sí mismo (Dir. Diego López Rivera)\\n- Rojo amanecer (Dir. Jorge Fons)\\n- Lola (Ópera Prima, Dir. María Novaro)\\n- Santa sangre (Dir. Alejandro Jodorowsky)";
                contenidoDefinido = true;
              }
            }
            // SUBTEMA: Arte
            else if (NOMBRES_SUB_BOTONES[j] === "Arte") {
              if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 1980
                tituloDelContenidoEspecifico = "Arte en 1980";
                urlDelVideoEspecifico ="assets/musica3.mp4";
                descripcionDelContenidoEspecifico = "- Exposiciones individuales de Fernando García Ponce en la Galería de la Universidad Autónoma de Puebla y la Galería Ponce (México D.F.).\\n- Mario Martín del Campo presenta \"Espacio y Grafismos\" en el Museo de Arte Carrillo Gil (MACG).\\n- Artistas mexicanos participan en muestras colectivas internacionales en la Casa de las Américas (Cuba) y el Museo Picasso de Antibes (Francia).\\n- Se identifica el surgimiento del Neomexicanismo como una corriente artística reconocible.\\n- Fundación del Tianguis Cultural del Chopo en el Museo Universitario del Chopo (4 de octubre).";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 1981
                tituloDelContenidoEspecifico = "Arte en 1981";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "- Fernando García Ponce expone individualmente en la Galería Ponce.\\n- Mario Martín del Campo exhibe escultura en plata en la Galería Miró, Monterrey.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 1982
                tituloDelContenidoEspecifico = "Arte en 1982";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "- Inauguración del Museo Nacional de Arte (MUNAL) el 23 de julio, enfocado en el arte mexicano desde el siglo XVI hasta la primera mitad del XX.\\n- Exposición colectiva \"Contemporary Painters of Mexico\" curada por Guillermo Sepúlveda en Los Ángeles.\\n- Mario Martín del Campo presenta pequeña escultura en plata en Fomento Cultural Banamex.\\n- El Tianguis del Chopo es expulsado del museo y se instala en la calle.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 1983
                tituloDelContenidoEspecifico = "Arte en 1983";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "- Fernando García Ponce expone en la Galería Ponce y en el Museo Universitario del Chopo.\\n- Mario Martín del Campo presenta \"Obras Recientes\" en la Galería López Quiroga.\\n- Participación mexicana en la exposición colectiva \"Tres Décadas de Pintura Mexicana\" en La Habana.\\n- Se forma el colectivo de arte feminista Polvo de Gallina Negra (Maris Bustamante y Mónica Mayer).";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 1984
                tituloDelContenidoEspecifico = "Arte en 1984";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "- Fernando García Ponce tiene exposiciones individuales en Galería Ponce y en la Secretaría de Hacienda y Crédito Público (SHCP).\\n- Mario Martín del Campo exhibe \"Realismo Fantástico\" en el Centro Cultural Adriano Olivetti.\\n- Artistas mexicanos participan en la I Bienal de La Habana.\\n- El Museo de Arte Moderno (MAM) presenta la exposición colectiva \"El color en el grabado\".";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 1985
                tituloDelContenidoEspecifico = "Arte en 1985";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "- Exposición individual de García Ponce en Galería Ponce.\\n- Guillermo Sepúlveda cura \"Mexico, The New Generations\" en el San Antonio Museum of Art.\\n- El terremoto del 19 de septiembre sacude la Ciudad de México, impactando profundamente la vida social y cultural. El Chopo es desalojado de la calle frente al museo e inicia su etapa nómada.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 1986
                tituloDelContenidoEspecifico = "Arte en 1986";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "- García Ponce expone individualmente en Galería Ponce.\\n- Se realiza la exposición \"Confrontación 86\" en el Palacio de Bellas Artes.\\n- Participación mexicana en la II Bienal de La Habana.\\n- El Museo de Monterrey presenta \"Alejandro Colunga. 20 años\", curada por Guillermo Sepúlveda.\\n- El Tianguis del Chopo sufre un ataque violento y continúa su itinerancia.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 8") { // Año 1987
                tituloDelContenidoEspecifico = "Arte en 1987";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "- Mario Martín del Campo tiene exposiciones individuales en Guadalajara (Galería Alejandro Gallo e Instituto Cultural Cabañas).\\n- El Tianguis del Chopo se establece en la calle Aldama y se formaliza como Asociación Civil.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 9") { // Año 1988
                tituloDelContenidoEspecifico = "Arte en 1988";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "- El Museo Carrillo Gil alberga las exposiciones colectivas \"Ruptura\" y \"Avance 88\".\\n- Mario Martín del Campo expone individualmente en la Galería López Quiroga.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 10") { // Contenido de 1989 y Resumen Neomexicanista
                tituloDelContenidoEspecifico = "Arte: Cierre de Década 1989 y el Neomexicanismo";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Eventos de 1989:\\n- Fernando García Ponce presenta \"Los Grandes Formatos de García Ponce\" en Galería Ponce.\\n- El Centro Cultural ALFA en Monterrey exhibe \"Pintura Mexicana de Hoy. Tradición e Innovación\", curada por Guillermo Sepúlveda.\\n- Creación del Fondo Nacional para la Cultura y las Artes (FONCA).\\n\\nResumen del Neomexicanismo (surgido en los 80s):\\nEl Neomexicanismo fue el movimiento más emblemático de la década. Se caracterizó por una revalorización de la identidad mexicana y sus tradiciones desde una perspectiva posmoderna, irónica y crítica. No fue un retorno nostálgico, sino una reapropiación de símbolos en el contexto de la crisis contemporánea.\\n\\nCaracterísticas Clave:\\n- Reapropiación Simbólica: Uso de iconografía de la cultura popular, historia, folclore y arte sacro (Virgen de Guadalupe, calaveras, luchadores, etc.).\\n- Eclecticismo Posmoderno: Fusión de elementos vernáculos con pop art, surrealismo y kitsch para recontextualizar símbolos.\\n- Temáticas Centrales: Identidad cultural, personal y sexual; género y feminidad; religión, poder, corrupción y crítica social.\\n- Estética Visual: Colores vibrantes, énfasis en narrativa y simbolismo, a veces con iconografía catastrofista.\\n\\nArtistas destacados (entre otros): Adolfo Patiño, Georgina Quintana, Julio Galán, Javier de la Garza, Germán Venegas, Dulce María Núñez, Nahum B. Zenil. No fue un grupo formal, sino una corriente amplia que ofreció múltiples maneras de relacionarse con los símbolos de la mexicanidad.";
                contenidoDefinido = true;
              }
            }
            // SUBTEMA: Música
            else if (NOMBRES_SUB_BOTONES[j] === "Música") {
              if (textosBotonesAnoEspecifico[k] === "Part 1") {
                tituloDelContenidoEspecifico = "Música en los 80s: Tendencias Generales";
                urlDelVideoEspecifico = "assets/musica.mp4";
                descripcionDelContenidoEspecifico = "- Emergencia y Popularidad de la Música Grupera: Combinando cumbia, norteño y ranchera, con artistas como Los Bukis y Bronco. El género evolucionó desde raíces del rock de los 60, resonando en zonas rurales.\\n- Movimiento \"Rock en tu Idioma\": Promovió rock en español de México, España y Argentina, con bandas como Caifanes, Fobia y Maldita Vecindad. Significó una creciente aceptación y comercialización del rock en México, facilitado por sellos discográficos y radios.\\n- Dominio de las Baladas Pop Latinas: Artistas como José José, Juan Gabriel, Ana Gabriel y Yuri encabezaron listas. \"Qué Te Pasa\" de Yuri fue un gran éxito en Billboard Hot Latin Tracks.\\n- Crecimiento de la Música Tejana: Ganó popularidad más allá de Texas, con Selena como figura prominente. Los Premios de la Música Tejana se fundaron en 1980.\\n- Establecimiento de Listas de Música Latina: Billboard introdujo Top Latin Albums y Hot Latin Tracks (Hot Latin 50 en oct. 1986), reconociendo la música latina.\\n- Eventos Clave: Primera inducción al Salón de la Fama del Rock and Roll en 1986, reflejando el panorama cultural más amplio.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 2") {
                tituloDelContenidoEspecifico = "Música en los 80s: Bandas Nacionales Clave";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Estas agrupaciones mexicanas fueron fundamentales en la escena del rock nacional y tuvieron una presencia destacada en el Tianguis del Chopo:\\n\\n- El Tri\\n  - Álbum: Simplemente (1984)\\n  - Canción destacada: \"Triste canción\"\\n  - Pioneros del rock urbano, con letras que reflejan la realidad social mexicana.\\n\\n- Botellita de Jerez\\n  - Álbum: Botellita de Jerez (1984)\\n  - Canción destacada: \"Guaca Rock de la Malinche\"\\n  - Creadores del \"guacarrock\", fusionando rock con elementos de la cultura popular mexicana.\\n\\n- Caifanes\\n  - Álbum: Caifanes (1988)\\n  - Canción destacada: \"La negra Tomasa\"\\n  - Mezclaron rock gótico con ritmos latinos, marcando una nueva etapa en el rock mexicano.\\n\\n- Maldita Vecindad y los Hijos del Quinto Patio\\n  - Álbum: Maldita Vecindad (1989)\\n  - Canción destacada: \"Pachuco\"\\n  - Integraron ska, punk y ritmos tradicionales, con letras que retratan la vida urbana.\\n\\n- Trolebús\\n  - Álbum: Trolebús en sentido contrario (1987)\\n  - Canción destacada: \"Barata y descontón\"\\n  - Representantes del rock urbano con letras que abordan la cotidianidad citadina.\\n\\n- Sangre Asteka\\n  - Álbum: Sangre Asteka (1991)\\n  - Canción destacada: \"La resistencia\"\\n  - Fusiones de rock con música tradicional mexicana, pioneros en su estilo.\\n\\n- Rastrillos\\n  - Formados en 1988, pioneros del reggae en México, con letras que combinan la cultura rasta y la mexicanidad.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 3") {
                tituloDelContenidoEspecifico = "Música en los 80s: Influencias Internacionales";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "El Tianguis del Chopo también fue un punto de encuentro para los seguidores de bandas internacionales que influenciaron las subculturas mexicanas:\\n\\n- The Cure\\n  - Álbum: Disintegration (1989)\\n  - Canción destacada: \"Lovesong\"\\n  - Iconos del rock gótico, con gran influencia en la estética y sonido de bandas mexicanas.\\n\\n- Joy Division\\n  - Álbum: Closer (1980)\\n  - Canción destacada: \"Love Will Tear Us Apart\"\\n  - Pioneros del post-punk, su sonido melancólico resonó en la escena underground mexicana.\\n\\n- The Clash\\n  - Álbum: Combat Rock (1982)\\n  - Canción destacada: \"Should I Stay or Should I Go\"\\n  - Su fusión de punk con otros géneros inspiró a bandas mexicanas a experimentar con sonidos diversos.\\n\\n- Dead Kennedys\\n  - Álbum: Fresh Fruit for Rotting Vegetables (1980)\\n  - Canción destacada: \"Holiday in Cambodia\"\\n  - Representantes del hardcore punk, influyeron en la actitud contestataria de bandas mexicanas.";
                contenidoDefinido = true;
              }
            }
            // SUBTEMA: Contexto México
            else if (NOMBRES_SUB_BOTONES[j] === "Contexto México") {
              if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 1980
                tituloDelContenidoEspecifico = "Contexto México: Transformación (1980)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Una Década de Transformación y Crisis\\n\\n- Un suceso determinante en la década fue el establecimiento de la autonomía universitaria y la libertad de cátedra. Este hecho se enmarca dentro de una tendencia global hacia la democratización y la disminución de regímenes autoritarios en Latinoamérica. La autonomía universitaria suele fomentar el surgimiento de movimientos estudiantiles y el pensamiento crítico, lo que potencialmente conduce a una mayor participación social y política. La libertad de cátedra, por su parte, permite la difusión de diversas perspectivas, desafiando la hegemonía de una única narrativa.\\n- El año 1980 también fue testigo del debut del videojuego Pac-Man. Aunque pueda parecer un evento menor, marcó el inicio de un fenómeno de la cultura pop global que también tuvo un impacto en México, como lo sugiere el auge de esta cultura en los años ochenta. La introducción de nuevas formas de entretenimiento y tecnología puede influir en las interacciones sociales, las actividades de ocio e incluso los valores culturales.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 1981
                tituloDelContenidoEspecifico = "Contexto México: Ansiedad Económica (1981)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "El presidente José López Portillo pronunció su célebre frase sobre la defensa del peso \"como un perro\". Esta declaración refleja las ansiedades económicas que precedieron a la grave crisis de 1982. Esta muestra de confianza contrastó fuertemente con el posterior colapso económico, ilustrando una posible subestimación gubernamental o incapacidad para controlar la situación. La retórica política a menudo busca proyectar seguridad en tiempos de incertidumbre, pero las realidades económicas pueden desmentir rápidamente tales afirmaciones.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 1982
                tituloDelContenidoEspecifico = "Contexto México: Crisis Severa (1982)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "El año 1982 se caracterizó por una severa crisis económica, evidenciada por la devaluación del peso, la suspensión de pagos de la deuda externa y la nacionalización de la banca por el presidente López Portillo. La nacionalización de la banca ocurrió específicamente el 1 de septiembre. Este evento tuvo consecuencias profundas y duraderas para la economía mexicana y la confianza pública en el gobierno, contribuyendo posiblemente al surgimiento de movimientos de oposición en años posteriores. Las crisis económicas suelen generar malestar social e inestabilidad política. La nacionalización de la banca fue una medida drástica que sugiere la gravedad de la situación y un posible giro hacia un mayor control estatal sobre la economía.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 1983
                tituloDelContenidoEspecifico = "Contexto México: Ajuste Neoliberal (1983)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "En 1983, apenas un año después de asumir la presidencia, Miguel de la Madrid continuaba enfrentando los efectos de la grave crisis económica heredada de los años anteriores. Implementó políticas de ajuste estructural y austeridad, influenciadas por el Fondo Monetario Internacional (FMI), lo que marcó el inicio del modelo neoliberal en México.\\n\\nEn 1983 se emitieron telenovelas populares como Bianca Vidal y La fiera, que fueron grandes éxitos de Televisa.\\n\\n- Devaluación del peso: La economía mexicana sufría los efectos de una inflación alta y una fuerte devaluación del peso frente al dólar.\\n- Tensiones sociales: Las políticas de austeridad generaron descontento social, sobre todo entre las clases populares y los trabajadores del sector público.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 1984
                tituloDelContenidoEspecifico = "Contexto México: Tragedia de San Juanico (1984)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Una trágica explosión en una planta de almacenamiento de PEMEX en San Juan Ixhuatepec causó una gran cantidad de muertes y heridos. Esta tragedia expuso posibles fallas de seguridad y regulatorias dentro de la empresa petrolera estatal, generando interrogantes sobre la supervisión y la rendición de cuentas del gobierno. Los desastres industriales a menudo provocan una protesta pública por regulaciones de seguridad más estrictas y pueden erosionar la confianza pública en las instituciones responsables.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 1985
                tituloDelContenidoEspecifico = "Contexto México: Terremoto y Respuesta Ciudadana (1985)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Un catastrófico terremoto azotó la Ciudad de México el 19 de septiembre, causando una destrucción generalizada y miles de muertes. La inacción inicial del gobierno de Miguel de la Madrid llevó a la ciudadanía a tomar un papel protagónico en las labores de rescate y reconstrucción, incluso con la participación del cantante Plácido Domingo. El terremoto no solo causó devastación física, sino que también reveló la resiliencia social y una posible desconexión entre el gobierno y la población, como lo demostró la iniciativa ciudadana. Los desastres naturales pueden exponer las vulnerabilidades de una sociedad y la efectividad de los mecanismos de respuesta ante desastres. La fuerte respuesta ciudadana podría indicar una falta de confianza o capacidad del gobierno en ese momento.\\n\\nEste evento marcó un antes y un después en la política, la sociedad civil y la arquitectura de la ciudad. México recibió apoyo humanitario de muchos países, lo que evidenció la solidaridad global ante la tragedia.\\n\\nLos Topos de Tlatelolco fueron un grupo de rescatistas voluntarios que surgió espontáneamente después del terremoto.\\n- Ciudadanos comunes, sin entrenamiento formal en rescate, que comenzaron a excavar con sus propias manos entre los escombros para salvar vidas.\\n- Estaban conformados por jóvenes, trabajadores, estudiantes y vecinos, muchos de ellos de la Unidad Habitacional Tlatelolco, una de las más afectadas por el sismo.\\n- Su nombre proviene de su capacidad para meterse entre los escombros, como topos, para encontrar sobrevivientes.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 1986
                tituloDelContenidoEspecifico = "Contexto México: Mundial y Descontento (1986)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "A pesar del recente terremoto, México fue sede de la Copa Mundial de la FIFA. Este evento trajo consigo una oportunidad económica y atrajo la atención global hacia México, incluyendo los famosos goles de Maradona. Sin embargo, el presidente De la Madrid fue abucheado durante la ceremonia de inauguración, lo que posiblemente reflejaba el descontento público tras el terremoto. Ser anfitrión de un importante evento internacional como la Copa del Mundo puede ser una fuente de orgullo nacional y actividad económica, pero también puede poner de manifiesto tensiones sociales y políticas existentes. El contraste entre el orgullo nacional por ser anfitrión del evento y el descontento público con el gobierno sugiere una compleja dinámica social.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 8") { // Año 1987
                tituloDelContenidoEspecifico = "Contexto México: Lunes Negro (1987)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "En octubre, ocurrió una crisis financiera mundial conocida como el Lunes Negro (19 de octubre), que también golpeó a México.\\nLa Bolsa Mexicana de Valores sufrió una caída estrepitosa, lo que desató temores de inestabilidad económica.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 9") { // Año 1988
                tituloDelContenidoEspecifico = "Contexto México: Elecciones Controvertidas (1988)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Las elecciones presidenciales fueron altamente controvertidas, con la declaración de Carlos Salinas de Gortari del PRI como ganador, en medio de acusaciones generalizadas de fraude electoral por parte de la oposición, liderada por Cuauhtémoc Cárdenas. Cárdenas denunció un presunto fraude, y se considera ampliamente que la elección fue manipulada. En aquel entonces, los mecanismos para asegurar comicios limpios eran prácticamente inexistentes. Esta elección es un punto de inflexión en la historia política mexicana, erosionando significativamente la confianza pública en el proceso electoral y probablemente impulsando el movimiento hacia la democratización en los años siguientes. Las acusaciones de fraude electoral pueden tener consecuencias a largo plazo para la legitimidad política y el desarrollo de instituciones democráticas.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 10") { // Año 1989
                tituloDelContenidoEspecifico = "Contexto México: Fundación del PRD (1989)";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Se fundó el Partido de la Revolución Democrática (PRD), liderado por Cuauhtémoc Cárdenas, a partir de los partidos integrantes del Frente Democrático Nacional (FDN). Esto marcó la formalización de una importante fuerza de oposición al PRI, que había gobernado durante mucho tiempo, lo que significó un cambio significativo en el panorama político. La formación de partidos de oposición fuertes es crucial para una democracia sana, ya que proporciona plataformas políticas alternativas y desafía el dominio de un solo partido.";
                contenidoDefinido = true;
              }
            }
            // SUBTEMA: Moda (actualmente con contenido por defecto)
            else if (NOMBRES_SUB_BOTONES[j] === "Moda") {
              // Para la Época 1980 y Subtema Moda, de momento no hay contenido específico año por año.
            }
            else if (textosBotonesEpocas[i] === "1990") {  }
            
            
            
            
            
// Agrega este sub-bloque para el SUBTEMA "Moda":
else if (NOMBRES_SUB_BOTONES[j] === "Moda") {
  if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 1990
    tituloDelContenidoEspecifico = "Moda 1990: Transición y Primeras Influencias Globales";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Al comienzo de la década de 1990, la moda en México experimentó una fase de transición, " +
      "construyendo sobre las tendencias de finales de los ochenta e incorporando nuevas influencias globales.\n\n" +
      "- La creciente globalización hizo que las tendencias internacionales de hip-hop y grunge permeen la cultura juvenil mexicana.\n" +
      "- Adopción inicial de pantalones anchos y camisas oversized, influenciados por el hip-hop.\n" +
      "- Aparecen elementos del grunge entre los jóvenes, con un estilo más descuidado y alternativo.\n" +
      "- En el ámbito profesional, persiste influencia del “power dressing” de los ochenta, con trajes estructurados y hombreras.";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 1991
    tituloDelContenidoEspecifico = "Moda 1991: Adopción Temprana del Hip-Hop y Grunge";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "La intersección entre la cultura pop estadounidense y la juventud mexicana se profundiza:\n\n" +
      "- Se popularizan aún más los pantalones holgados y camisetas oversized, característicos del hip-hop.\n" +
      "- El grunge sigue ganando presencia entre adolescentes, con camisas de franela y jeans desgastados.\n" +
      "- El “power dressing” profesional mantiene su fuerza, pero comienza a mezclarse con prendas más relajadas.\n" +
      "- El Tianguis del Chopo sirve como escaparate para piezas contraculturales, ofreciendo alternativas a la moda mainstream.";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 1992
    tituloDelContenidoEspecifico = "Moda 1992: Consolidación Temprana del Grunge y Hip-Hop";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Para 1992, las influencias globales se afianzan en la moda juvenil:\n\n" +
      "- El hip-hop impone la estética de ropa cómoda y holgada; chándales, gorras y zapatillas ganan popularidad.\n" +
      "- El grunge se consolida con camisas de franela a cuadros, suéteres holgados y botas pesadas.\n" +
      "- Los diseñadores aún exploran el “power dressing” pero empiezan a incorporar detalles deportivos.\n" +
      "- El Tianguis del Chopo muestra stands con ropa vintage y mezclas eclécticas, reflejo de la contracultura emergente.";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 1993
    tituloDelContenidoEspecifico = "Moda 1993: Estilos Juveniles Emergentes";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 1993, la moda juvenil ya integra con fuerza las tendencias foráneas:\n\n" +
      "- Los pantalones de tiro bajo y camisetas estampadas se vuelven comunes entre la generación joven.\n" +
      "- Accesorios como cadenas, gorras planas y mochilas de lona reflejan la influencia del hip-hop.\n" +
      "- El grunge se suaviza con mezclas: camisetas de bandas debajo de suéteres desgastados.\n" +
      "- El “power dressing” corporativo comienza a perder terreno frente a prendas más informales y cómodas.";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 1994
    tituloDelContenidoEspecifico = "Moda 1994: Impacto de la Crisis del Peso";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "La etapa 1994-1996 se caracteriza por un enfoque en la practicidad debido al contexto económico:\n\n" +
      "- La crisis del peso de 1994 obliga a muchos a buscar ropa asequible y funcional.\n" +
      "- Persiste la presencia de tendencias globales (hip-hop y grunge), pero adaptadas a presupuestos más bajos.\n" +
      "- Prendas de segunda mano y ropa reciclada ganan importancia en espacios como el Tianguis del Chopo.\n" +
      "- El “power dressing” se relaja: sastres y hombreras desaparecen gradualmente, cediendo a cortes más simples.";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 1995
    tituloDelContenidoEspecifico = "Moda 1995: Practicidad y Adaptación Económica";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En medio de la crisis económica, la moda se ajusta a la realidad social:\n\n" +
      "- El “Efecto Tequila” reduce el consumo de marcas caras; se prioriza la funcionalidad.\n" +
      "- Aparecen mercados emergentes de ropa usada y artículos vintage en barrios de CDMX.\n" +
      "- Las tendencias internacionales se adaptan: camisetas de banda clonadas y jeans económicos.\n" +
      "- El Tianguis del Chopo refuerza su papel como plataforma para ropa alternativa y accesorios únicos.";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 1996
    tituloDelContenidoEspecifico = "Moda 1996: Adaptación y Recuperación Parcial";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Hacia 1996, la economía empieza a estabilizarse, pero la austeridad aún moldea tendencias:\n\n" +
      "- Se mantienen prendas prácticas y asequibles, aunque algunas marcas nacionales resurgen.\n" +
      "- El hip-hop y el grunge siguen vigentes, pero surgen combinaciones con toques mexicanos: camisas texanas, botas y cinturones con hebillas llamativas.\n" +
      "- El Tianguis del Chopo exhibe colaboraciones entre diseñadores locales y artistas urbanos.\n" +
      "- El “power dressing” reaparece tímidamente en oficinas de sectores en recuperación económica.";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 8") { // Año 1997
    tituloDelContenidoEspecifico = "Moda 1997: Recuperación Económica e Influencia Mediática";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Con la economía más estable, la moda juvenil se vuelve más dinámica:\n\n" +
      "- Aumenta el consumo de ropa de marca y se consolidan tiendas departamentales.\n" +
      "- Influencia de telenovelas como “Soñadoras” y “Primer amor, a mil por hora” en prendas y accesorios.\n" +
      "- El hip-hop y el grunge coexisten con primeros indicios de tendencias Y2K: colores pastel y telas brillantes.\n" +
      "- El Tianguis del Chopo recibe a diseñadores independientes que suman propuestas de vestimenta urbana.";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 9") { // Año 1998
    tituloDelContenidoEspecifico = "Moda 1998: Consolidación de Tendencias Casuales y Pop";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 1998, la moda en México se orienta hacia una estética casual y pop:\n\n" +
      "- Prendas casuales como shorts deportivos, camisetas estampadas y zapatillas blancas dominan el guardarropa juvenil.\n" +
      "- Las telenovelas y la música pop guían combinaciones: mezclilla clara, blusas de colores vivos, accesorios llamativos.\n" +
      "- El hip-hop se suaviza con toques “sportwear” y el grunge cede terreno a looks más limpios.\n" +
      "- El Tianguis del Chopo expande su oferta: además de vintage, hay tiendas de ropa importada y accesorios de nicho.";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 10") { // Año 1999
    tituloDelContenidoEspecifico = "Moda 1999: Hacia el Estilo Y2K y Fin de Década";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En el cierre de los noventa, ya se anticipan las tendencias del nuevo milenio:\n\n" +
      "- Los colores pastel, telas brillantes y aplicaciones metálicas anuncian el Y2K.\n" +
      "- La influencia de las telenovelas sigue, pero los jóvenes buscan identidad en subculturas: emo, pop-punk y nu-metal.\n" +
      "- El “power dressing” regresa en algunos despachos, pero con cortes más entallados y colores más neutros.\n" +
      "- El Tianguis del Chopo se consolida como centro de moda alternativa, con stands de ropa retro y accesorios de fantasía.";
    contenidoDefinido = true;
  }
}
// Fin del sub-bloque para SUBTEMA “Moda” en Época 1990

          }
          else if (NOMBRES_SUB_BOTONES[j] === "Música") {
  if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 1990
    tituloDelContenidoEspecifico = "Música 1990: Contracultura y Debuts Claves";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 1990, el Tianguis del Chopo se consolida como referente contracultural en CDMX:\n\n" +
      "- El Chopo es punto de encuentro para rock, punk, metal y otras expresiones alternativas.\n" +
      "- Fobia lanza su álbum debut “Fobia” (1990), aportando su estilo pop-rock con humor y surrealismo.\n" +
      "- Continúa el éxito de la música grupera y el rock en español; el público busca material difícil de encontrar en tiendas convencionales.\n" +
      "- Surgen publicaciones como Aullido y Códice Rock que promueven conciertos y eventos en el Tianguis.";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 1991
    tituloDelContenidoEspecifico = "Música 1991: Pop Latino y Nuevos Talentos Emergentes";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 1991, la escena musical en México se diversifica y gana visibilidad:\n\n" +
      "- Luis Miguel consolida su estatus como estrella del pop latino, marcando tendencias en las listas de éxitos.\n" +
      "- El rock en español sigue creciendo con bandas que se preparan para debutar, aunque muchas aún afinan su sonido.\n" +
      "- La música regional mexicana, especialmente banda y norteño, gana popularidad en EE. UU., influenciando a la comunidad mexicana.\n" +
      "- El Tianguis del Chopo ofrece acceso a cintas y discos importados, fortaleciendo redes de intercambio underground.";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 1992
    tituloDelContenidoEspecifico = "Música 1992: Nacimiento de Café Tacvba y Caifanes en Cima";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "El año 1992 marca puntos de inflexión para el rock mexicano:\n\n" +
      "- Café Tacvba lanza su álbum debut “Café Tacvba” (1992), fusionando géneros tradicionales con rock alternativo.\n" +
      "- Caifanes lanza “El Silencio” (1992), consolidándose como pioneros del rock en español con toques góticos y progresivos.\n" +
      "- La escena del hip hop mexicano comienza a gestarse, con artistas buscando reflejar la vida urbana.\n" +
      "- El Tianguis del Chopo refuerza su rol de plataforma para bandas alternativas y material difícil de conseguir.";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 1993
    tituloDelContenidoEspecifico = "Música 1993: Crecimiento y Diversificación de Géneros";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 1993, la escena alternativa profundiza su alcance:\n\n" +
      "- Emergen agrupaciones como Santa Sabina, que fusiona rock gótico con jazz y experimental.\n" +
      "- Tijuana No! gana seguidores con su mezcla de ska, punk y ritmos tradicionales.\n" +
      "- Control Machete empieza a gestarse como proyecto de hip hop que reflejará la vida urbana.\n" +
      "- El Chopo refuerza sus conexiones con bandas emergentes que combinan géneros y retan lo comercial.";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 1994
    tituloDelContenidoEspecifico = "Música 1994: Álbumes Icónicos y Surgimiento de Molotov";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "El 1994 vio lanzamientos que marcaron la década:\n\n" +
      "- Café Tacvba publica “Re” (1994), álbum fundamental que redefine el rock alternativo mexicano.\n" +
      "- Caifanes edita “El Nervio del Volcán” (1994), consolidándolos como referentes del rock en español.\n" +
      "- Santa Sabina lanza “Símbolos” (1994), fortaleciendo la escena gótica con toques experimentales.\n" +
      "- Molotov se forma en 1994; su mezcla de rap, rock y funk traerá crítica social a la vanguardia.";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 1995
    tituloDelContenidoEspecifico = "Música 1995: Impacto de Selena y Auge del Hip Hop";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 1995, la música latina vive momentos trascendentales:\n\n" +
      "- La trágica muerte de Selena (1995) impacta profundamente a la industria latina y a sus seguidores.\n" +
      "- Control Machete publica su álbum debut “Mucho Barato...” (1996), aunque ya ganan reconocimiento desde 1995.\n" +
      "- La popularidad del hip hop mexicano crece en el underground, con letras que reflejan la vida urbana y social.\n" +
      "- El Tianguis del Chopo refuerza su rol como plataforma para artistas independientes y lanzamientos emergentes.";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 1996
    tituloDelContenidoEspecifico = "Música 1996: Hip Hop y Nuevas Voces";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "El 1996 consolida al hip hop y otras propuestas:\n\n" +
      "- Control Machete gana atención con “Comprendes, Méndez” y “Sí Señor” tras la salida de su álbum en 1996.\n" +
      "- Santa Sabina experimenta con sonidos más oscuros y teatralizados, ampliando la escena gótica.\n" +
      "- La Barranca se forma y empieza a ofrecer rock con lirismo poético y atmósferas introspectivas.\n" +
      "- El Tianguis del Chopo sirve como foro para presentaciones de hip hop, punk y proyectos alternativos.";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 8") { // Año 1997
    tituloDelContenidoEspecifico = "Música 1997: Molotov y Rock Experimental";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "1997 es un año clave para el rock de protesta:\n\n" +
      "- Molotov lanza “¿Dónde Jugarán las Niñas?” (1997), con “Gimme Tha Power” y “Voto Latino” criticando la corrupción.\n" +
      "- La Barranca publica “Tempestad” (1997), destacando su sonido atmosférico y letras reflexivas.\n" +
      "- Plastilina Mosh comienza a forjar su estilo único, aunque su álbum debut llegará en 1998.\n" +
      "- El Chopo refuerza conexiones con bandas emergentes que combinan géneros y retan lo comercial.";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 9") { // Año 1998
    tituloDelContenidoEspecifico = "Música 1998: Plastilina Mosh y Electrorock";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 1998, la electrónica y el rock se fusionan:\n\n" +
      "- Plastilina Mosh lanza “Aquamosh” (1998), con “Mr. P. Mosh” y “Niño Bomba”, mezclando electrónica, funk y rock.\n" +
      "- Zurdok se forma y se prepara para su álbum debut de 1999, influenciados por el rock melódico.\n" +
      "- Caifanes y Café Tacvba mantienen giras, pero dejan espacio para nuevas propuestas alternativas.\n" +
      "- El Chopo acoge eventos de música electrónica y showcases experimentales.";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 10") { // Año 1999
    tituloDelContenidoEspecifico = "Música 1999: Zurdok y Cierre de Década";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 1999, la escena alternativa mira al futuro del indie rock:\n\n" +
      "- Zurdok publica “Hombre Sintetizador” (1999), con “Abre los ojos” y “Si me hablas al revés”, consolidándose en el indie.\n" +
      "- Plastilina Mosh sigue con éxito “Aquamosh”, marcando el electrorock mexicano.\n" +
      "- Molotov y Control Machete continúan su ascenso como representantes del rock contestatario.\n" +
      "- El Tianguis del Chopo cierra la década como epicentro de contracultura, preparándose para los cambios del nuevo milenio.";
    contenidoDefinido = true;
  }
} // ← fin del sub-bloque Música en Época 1990

          // --- FIN DE LA INTEGRACIÓN DE CONTENIDO PARA ÉPOCA "1980" ---

          // --- INICIO DE LA INTEGRACIÓN DE CONTENIDO PARA ÉPOCA "1990" ---
          else if (textosBotonesEpocas[i] === "1990") {
            // SUBTEMA: Contexto del Chopo
            if (NOMBRES_SUB_BOTONES[j] === "Contexto del Chopo") {
              if (textosBotonesAnoEspecifico[k] === "Part 1") { // 1990
                tituloDelContenidoEspecifico = "Chopo 1990: Época Dorada y Expansión";
                descripcionDelContenidoEspecifico = "La década de 1990 es considerada por algunos como la \"época dorada\" del Tianguis Cultural del Chopo, un periodo de \"bonanza\" cultural y comercial.\n\n"
                + "- Se observa un aumento en los negocios dentro del tianguis, así como intentos por regularizar sus actividades.\n"
                + "- Se consolida como un punto de encuentro para diversos géneros musicales y tribus urbanas. Se establecen zonas específicas para artesanos, punks y otras contraculturas.\n"
                + "- Se crean Radio Chopo y publicaciones como _Aullido_ y _Códice Rock_, fortaleciendo la identidad del tianguis y promoviendo sus actividades.\n"
                + "- _Códice Rock_ juega un papel importante en la promoción de conciertos, firmas de autógrafos y lanzamientos de discos conmemorativos en el tianguis.\n"
                + "- Bandas de renombre como Café Tacvba y El Tri tocan en el Tianguis del Chopo, utilizando este espacio como una plataforma importante.\n"
                + "- Los vendedores del tianguis experimentan una época de prosperidad económica.\n"
                + "- El Tianguis del Chopo participa en la organización de conciertos en el Zócalo de la Ciudad de México.\n"
                + "- El Tianguis del Chopo es invitado a participar en la primera edición del festival Vive Latino.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // 1991
                tituloDelContenidoEspecifico = "Chopo 1991: Tocadas Informales y Bandas";
                descripcionDelContenidoEspecifico = "Inician tocadas informales en la calle; nacen bandas independientes alrededor del tianguis.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // 1992
                tituloDelContenidoEspecifico = "Chopo 1992: Video y Memorabilia";
                descripcionDelContenidoEspecifico = "Comienza la venta de videocassettes y memorabilia importada alternativa.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // 1993
                tituloDelContenidoEspecifico = "Chopo 1993: Performance y Teatro Callejero";
                descripcionDelContenidoEspecifico = "Se integra el performance y teatro callejero como parte de la experiencia.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // 1994
                tituloDelContenidoEspecifico = "Chopo 1994: Redes de Distribución";
                descripcionDelContenidoEspecifico = "Se fortalecen las redes de distribución de material punk, metal y ska.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // 1995
                tituloDelContenidoEspecifico = "Chopo 1995: Foros de Discusión";
                descripcionDelContenidoEspecifico = "Se organizan foros de discusión sobre cultura alternativa y derechos juveniles.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 7") { // 1996
                tituloDelContenidoEspecifico = "Chopo 1996: Cómics y Cultura Gótica";
                descripcionDelContenidoEspecifico = "Aparecen los primeros stands de cómics y cultura gótica.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 8") { // 1997
                tituloDelContenidoEspecifico = "Chopo 1997: Difusión por Internet";
                descripcionDelContenidoEspecifico = "Se impulsa el uso de internet para difundir la actividad del tianguis.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 9") { // 1998
                tituloDelContenidoEspecifico = "Chopo 1998: Participación en Ferias Culturales";
                descripcionDelContenidoEspecifico = "Participa en ferias culturales de la ciudad como espacio representativo.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 10") { // 1999
                tituloDelContenidoEspecifico = "Chopo 1999: Referente de Autogestión";
                descripcionDelContenidoEspecifico = "El tianguis se convierte en punto de referencia para proyectos de autogestión.";
                contenidoDefinido = true;
              }
            }
            // SUBTEMA: Cine
            else if (NOMBRES_SUB_BOTONES[j] === "Cine") {
              if (textosBotonesAnoEspecifico[k] === "Part 1") { // 1990
                tituloDelContenidoEspecifico = "Cine 1990: Transición y 'Nuevo Cine Mexicano'";
                urlDelVideoEspecifico = "assets/con chop 4.mp4";
                descripcionDelContenidoEspecifico = "La década de 1990 inició bajo el impacto de políticas neoliberales que afectaron la industria cinematográfica, con reducción de apoyo estatal y cambios en la exhibición. Esta etapa vio una caída en la producción, pero también fue el germen del 'Nuevo Cine Mexicano', con cineastas buscando alternativas y temáticas más críticas.\\n\\nEventos y Películas Destacadas de 1990:\\n- Los Premios Ariel (XXXII ed., para películas de 1989) galardonaron a 'Goitia, un dios para sí mismo' (Dir. Diego López Rivera) como Mejor Película y Mejor Director.\\n- 'Rojo amanecer' (Dir. Jorge Fons), sobre Tlatelolco, marcó un hito por su temática política.\\nOtras películas notables del año fueron:\\n- Lola (Dir. María Novaro)\\n- Morir en el Golfo (Dir. Alejandro Pelayo)\\n- Rosa de dos aromas (Dir. Gilberto Gazcón)\\n- El homicida (Dir. Alfonso Rosas Priego)\\n- Sandino (Dir. Miguel Littin)\\n- Las buenas costumbres (Dir. Rolando D.A.)\\n- Astucia (Dir. Mario Hernández)\\n- El motel de la muerte (Dir. Leopoldo Laborde)";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // 1991
                tituloDelContenidoEspecifico = "Cine 1991: Cuarón Debuta y Arieles";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Se estrena 'Sólo con tu pareja', ópera prima de Alfonso Cuarón. Los Premios Ariel (XXXIII edición, para películas de 1990) reconocieron a 'Rojo amanecer' de Jorge Fons como Mejor Película y Mejor Director.\\n\\nOtras Películas Destacadas de 1991:\\n- Pueblo de madera (Dir. Juan Antonio de la Riva)\\n- La leyenda de una máscara (Ópera Prima, Dir. José Buil)\\n- La mujer de Benjamín (Ópera Prima, Dir. Carlos Carrera)\\n- El bulto (Dir. Gabriel Retes)\\n- Ciudad de ciegos (Dir. Alberto Cortés)\\n- Danzón (Dir. María Novaro)\\n- Bandidos (Dir. Luis Estrada)\\n- Cabeza de Vaca (Dir. Nicolás Echevarría)";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // 1992
                tituloDelContenidoEspecifico = "Cine 1992: Fenómeno 'Como agua para chocolate' y Ley de Cine";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "'Como agua para chocolate' (Dir. Alfonso Arau) se convierte en un fenómeno internacional. La Ley Federal de Cinematografía de 1992 redujo la cuota de pantalla obligatoria para el cine mexicano.\\nLos Premios Ariel (XXXIV edición, para películas de 1991) premiaron a 'Como agua para chocolate' como Mejor Película y Mejor Director. 'La mujer de Benjamín' de Carlos Carrera fue reconocida como Mejor Ópera Prima.\\n\\nOtras Películas Destacadas de 1992:\\n- Danzón (Dir. María Novaro)\\n- El bulto (Dir. Gabriel Retes)\\n- Sólo con tu pareja (Dir. Alfonso Cuarón)\\n- Ángel de fuego (Ópera Prima, Dir. Dana Rotberg)\\n- Playa azul (Dir. Alfredo Joskowicz)\\n- Objetos perdidos (Corto, Dir. Eva López Sánchez)\\n- Anoche soñé contigo (Ópera Prima, Dir. Maryse Sistach)\\n- Modelo antiguo (Dir. Raúl Araiza)";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // 1993
                tituloDelContenidoEspecifico = "Cine 1993: 'Cronos' de Del Toro y Consolidación Autoral";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Guillermo del Toro debuta con 'Cronos'. Los Premios Ariel (XXXV edición, para películas de 1992) reconocieron a 'Cronos' como Mejor Película y Mejor Ópera Prima, y a Guillermo del Toro como Mejor Director.\\n\\nOtras Películas Destacadas de 1993:\\n- Ángel de fuego (Dir. Dana Rotberg)\\n- Tequila (Dir. Rubén Gámez)\\n- Miroslava (Dir. Alejandro Pelayo)\\n- Principio y fin (Dir. Arturo Ripstein)\\n- La vida conyugal (Dir. Carlos Carrera)\\n- Desiertos mares (Ópera Prima, Dir. José Luis García Agraz)\\n- Lolo (Ópera Prima, Dir. Francisco Athié)\\n- Fray Bartolomé de las Casas (Dir. Sergio Olhovich)\\n- Golpe de suerte (Dir. Marcela Fernández Violante)";
                contenidoDefinido = true;
              }
              // Las Partes 5 a 10 para Cine 1990s usarán el contenido genérico por defecto
            }
            // SUBTEMA: Arte
            else if (NOMBRES_SUB_BOTONES[j] === "Arte") {
              if (textosBotonesAnoEspecifico[k] === "Part 1") { // 1990
                tituloDelContenidoEspecifico = "Arte en 1990: Inicios de Década y FONCA";
                urlDelVideoEspecifico = "assets/musica3.mp4";
                descripcionDelContenidoEspecifico = "La década de 1990 en México estuvo marcada por una profunda reconfiguración socio-política y económica, con eventos como la posterior entrada en vigor del TLCAN (1994) y el levantamiento del EZLN (1994) que influirían en el panorama cultural.\\n\\nEventos artísticos destacados en 1990:\\n- Entra en funciones el Fondo Nacional para la Cultura y las Artes (FONCA), creado en 1989, consolidándose como un apoyo crucial para los creadores mexicanos y para el desarrollo de proyectos artísticos en diversas disciplinas.\\n- La magna exposición \\\"México: Esplendores de Treinta Siglos\\\" inicia su importante itinerancia internacional. Comienza su recorrido en el Museo Metropolitano de Arte de Nueva York, para luego viajar a San Antonio y Los Ángeles, presentando una vasta panorámica del arte mexicano desde la época prehispánica hasta el siglo XX a un público internacional.\\n- Se presenta una exposición del reconocido pintor yucateco Fernando García Ponce en el Museo de la Estampa del Instituto Nacional de Bellas Artes (INBA), reafirmando su lugar en el abstraccionismo mexicano.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // 1991
                tituloDelContenidoEspecifico = "Arte en 1991: Apertura del MARCO";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Eventos artísticos destacados en 1991:\\n- Apertura del Museo de Arte Contemporáneo de Monterrey (MARCO).\\n- Exposiciones de Fernando García Ponce en Oaxaca.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // 1992
                tituloDelContenidoEspecifico = "Arte en 1992: Contexto TLCAN y Exposiciones";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Contexto relevante:\\n- Firma del TLCAN (Tratado de Libre Comercio).\\n\\nEventos artísticos destacados en 1992:\\n- Exposición de Mario Martín del Campo, \\\"Trashumantes Musicales\\\", en la Galería Juan Martín.\\n- Obra de Franco Aceves Humana, \\\"Pintura con lámpara y animalillo\\\".";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // 1993
                tituloDelContenidoEspecifico = "Arte en 1993: SNCA y Espacios Independientes";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Eventos artísticos y culturales destacados en 1993:\\n- Creación del Sistema Nacional de Creadores de Arte (SNCA) por FONCA.\\n- Apertura del espacio independiente Temístocles 44 en CDMX.\\n- Exposición de Mario Martín del Campo, \\\"El Ala Circular de la Música\\\", en el Museo de Monterrey e Instituto Cultural Mexicano San Antonio.\\n- Luis Felipe Ortega participa en \\\"Instalaciones en Temístocles 44\\\".";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // 1994
                tituloDelContenidoEspecifico = "Arte en 1994: TLCAN, EZLN y Efervescencia Artística";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "1994 fue un año crucial:\\n- Entrada en vigor del TLCAN y el simultáneo levantamiento del EZLN en Chiapas. Estos eventos cristalizaron tensiones, simbolizando la integración neoliberal y a la vez la resistencia indígena y la crítica social, influyendo profundamente el ambiente cultural y artístico.\\n- Temas como fronteras, violencia, y el estado de las instituciones permearon la producción artística, con el zapatismo inspirando solidaridad.\\n\\nExposiciones destacadas de Luis Felipe Ortega en Temístocles 44: \\\"La lengua\\\", \\\"Monocromática\\\", \\\"Calma\\\", \\\"Terror en la montaña rusa\\\".\\n- Exposición colectiva \\\"Jonge kunts uit México\\\" en Hasselt, Bélgica (incluye a Ortega).\\n- Exposición \\\"Compulsivamente Yo, Autorretrato\\\", 25 Aniversario U de M (curaduría G. Sepúlveda).\\n- Consolidación de la escena Goth en México.\\n- La crisis del peso ('Error de Diciembre') se agudiza a finales de año.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // 1995
                tituloDelContenidoEspecifico = "Arte en 1995: La Panadería y Crisis Económica";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Eventos artísticos y culturales destacados en 1995:\\n- Apertura del espacio independiente La Panadería.\\n- Exposición de Luis Felipe Ortega, \\\"Ummaguma. Especies de indeterminación\\\", en Guadalajara.\\n- Exposición \\\"La liga de la injusticia\\\" en La Panadería.\\n- Profunda crisis económica (\\\"Efecto Tequila\\\").";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 7") { // 1996
                tituloDelContenidoEspecifico = "Arte en 1996: Escena Independiente y Proyección Internacional";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Eventos artísticos destacados en 1996:\\n- Exposición colectiva \\\"Arts Scenes\\\", L´ Espace Paul Ricard, París (incluye a Ortega).\\n- Exposición \\\"Muestra de arte y cine independiente\\\", La Panadería.\\nContexto relevante:\\n- Reforma electoral influenciada por el contexto post-EZLN.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 8") { // 1997
                tituloDelContenidoEspecifico = "Arte en 1997: Actividad en Galerías y Espacios Alternativos";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Eventos artísticos destacados en 1997:\\n- Luis Felipe Ortega participa en \\\"Campo de acción\\\", Art&Idea, CDMX.\\n- Exposición colectiva \\\"Shopping\\\", Galería Arte & Idea, CDMX.\\n- Exposición colectiva \\\"Mercurio, Comunicación y dinero\\\", Galería Arte Contemporáneo, Guadalajara.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 9") { // 1998
                tituloDelContenidoEspecifico = "Arte en 1998: Museos y Proyección en Francia";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Eventos artísticos destacados en 1998:\\n- Exposición colectiva \\\"Cambio\\\", Museo Universitario del Chopo.\\n- Exposición colectiva \\\"Videos D ́ Art Du Mexique Et Des Etats-Unis\\\", Musée d ́Art Contemporain de Lyon, Francia.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 10") { // 1999
                tituloDelContenidoEspecifico = "Arte en 1999: Kurimanzutto, Retrospectivas y Contexto UNAM";
                urlDelVideoEspecifico = null;
                descripcionDelContenidoEspecifico = "Eventos artísticos y culturales destacados en 1999:\\n- Galería Kurimanzutto realiza la exposición \\\"Economía de mercado\\\" en el Mercado de Medellín.\\n- Exposición \\\"Yo y mi circunstancia. Movilidad en el arte contemporáneo mexicano\\\", Museo de Bellas Artes de Montreal (Nov 1999 - Feb 2000).\\n- Retrospectiva de Enrique Guzmán, MAM y MARCO.\\n- Luis Felipe Ortega participa en exposiciones en Hamburgo (\\\"Reisen\\\") y Nueva York (\\\"Paradise 8\\\").\\nContexto relevante:\\n- Huelga en la UNAM.";
                contenidoDefinido = true;
              }
            }
             // SUBTEMA: Contexto México
            else if (NOMBRES_SUB_BOTONES[j] === "Contexto México") {
              if (textosBotonesAnoEspecifico[k] === "Part 1") { // 1990
                tituloDelContenidoEspecifico = "Contexto México 1990: Neoliberalismo y Derechos Humanos";
                descripcionDelContenidoEspecifico = "Se intensificaron movimientos magisteriales, ferrocarrileros y de trabajadores del IMSS. Se formó la Comisión Nacional de Derechos Humanos. Comenzó la privatización de empresas estatales como Telmex y algunas autopistas, marcando un cambio hacia un modelo neoliberal. Octavio Paz recibió el Premio Nobel de Literatura.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // 1991
                tituloDelContenidoEspecifico = "Contexto México 1991: Éxodo por la Democracia y Reformas Iglesia-Estado";
                descripcionDelContenidoEspecifico = "El PRI ganó elecciones en Tabasco, generando inconformidad en el PRD que inició el \"Éxodo por la Democracia\". Se reformaron artículos constitucionales para flexibilizar leyes sobre la Iglesia, otorgándole personalidad jurídica y permitiendo el voto a ministros de culto, manteniendo el estado laico.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // 1992
                tituloDelContenidoEspecifico = "Contexto México 1992: Firma del TLC y Plebiscito CDMX";
                descripcionDelContenidoEspecifico = "Se firmó el Tratado de Libre Comercio de América del Norte (TLC) entre México, Estados Unidos y Canadá. Se efectuó un plebiscito en la Ciudad de México por los derechos políticos de sus habitantes, a favor de convertir al DF en el estado 32, con congreso local y elección de gobierno.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // 1993
                tituloDelContenidoEspecifico = "Contexto México 1993: Violencia y Crimen Organizado";
                descripcionDelContenidoEspecifico = "Fue asesinado el cardenal Juan Jesús Posadas Ocampo en Guadalajara, subrayando el creciente problema de la violencia y el crimen organizado en México.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // 1994
                tituloDelContenidoEspecifico = "Contexto México 1994: TLC, Zapatistas y Asesinato de Colosio";
                descripcionDelContenidoEspecifico = "El TLC entró en vigor el 1 de enero. Coincidiendo, ocurrió el levantamiento zapatista en Chiapas. Luis Donaldo Colosio, candidato presidencial del PRI, fue asesinado en Tijuana, sumiendo al país en incertidumbre política.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // 1995
                tituloDelContenidoEspecifico = "Contexto México 1995: Crisis 'Efecto Tequila' y Diálogo EZLN";
                descripcionDelContenidoEspecifico = "Continuó la crisis económica (\"efecto tequila\"), con aumento del IVA e incremento del desempleo. Comenzaron las negociaciones entre el gobierno y el Ejército Zapatista de Liberación Nacional (EZLN) en Chiapas.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 7") { // 1996
                tituloDelContenidoEspecifico = "Contexto México 1996: Autonomía Electoral del IFE";
                descripcionDelContenidoEspecifico = "El Instituto Federal Electoral (IFE) se convirtió en una institución independiente del gobierno, un paso significativo hacia una mayor autonomía electoral en México.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 8") { // 1997
                tituloDelContenidoEspecifico = "Contexto México 1997: Cambios Políticos Significativos";
                descripcionDelContenidoEspecifico = "Por primera vez, el PRI perdió su mayoría absoluta en la Cámara de Diputados. Se eligió por primera vez al Jefe de Gobierno de la Ciudad de México, ganando Cuauhtémoc Cárdenas del PRD. Estos eventos marcaron un cambio en el panorama político.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 9") { // 1998
                tituloDelContenidoEspecifico = "Contexto México 1998: Creación del FOBAPROA";
                descripcionDelContenidoEspecifico = "Se creó el Fondo Bancario de Protección al Ahorro (FOBAPROA) para rescatar las deudas de los bancos, una medida controvertida para estabilizar el sistema financiero.";
                contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 10") { // 1999
                tituloDelContenidoEspecifico = "Contexto México 1999: Huelga Estudiantil en la UNAM";
                descripcionDelContenidoEspecifico = "Estalló en la Universidad Nacional Autónoma de México (UNAM) la huelga estudiantil más larga de su historia en protesta por el aumento de las cuotas, reflejando descontento social y la importancia del acceso a la educación.";
                contenidoDefinido = true;
              }
            }
            // SUBTEMA: Moda
            else if (NOMBRES_SUB_BOTONES[j] === "Moda") {
              if (textosBotonesAnoEspecifico[k] === "Part 1") { // 1990
                  tituloDelContenidoEspecifico = "Moda 1990: Transición y Primeras Influencias Globales";
                  descripcionDelContenidoEspecifico = "Adopción inicial de tendencias globales como ropa holgada (hip-hop) y las primeras influencias del grunge. Posible continuación de estilos de finales de los 80. La cultura pop estadounidense, incluyendo el hip-hop y el grunge, comenzó a permear la cultura juvenil mexicana. En el ámbito profesional, es probable que se mantuviera cierta influencia del 'power dressing' de los años ochenta.";
                  contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // 1991
                  tituloDelContenidoEspecifico = "Moda 1991: Adopción de Tendencias Globales";
                  descripcionDelContenidoEspecifico = "Adopción inicial de tendencias globales como ropa holgada (hip-hop) y las primeras influencias del grunge. Posible continuación de estilos de finales de los 80. La cultura pop estadounidense, incluyendo el hip-hop y el grunge, comenzó a permear la cultura juvenil mexicana. En el ámbito profesional, es probable que se mantuviera cierta influencia del 'power dressing' de los años ochenta.";
                  contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // 1992
                  tituloDelContenidoEspecifico = "Moda 1992: Consolidación Temprana del Grunge y Hip-Hop";
                  descripcionDelContenidoEspecifico = "Adopción inicial de tendencias globales como ropa holgada (hip-hop) y las primeras influencias del grunge. Posible continuación de estilos de finales de los 80. La cultura pop estadounidense, incluyendo el hip-hop y el grunge, comenzó a permear la cultura juvenil mexicana. En el ámbito profesional, es probable que se mantuviera cierta influencia del 'power dressing' de los años ochenta.";
                  contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // 1993
                  tituloDelContenidoEspecifico = "Moda 1993: Estilos Juveniles Emergentes";
                  descripcionDelContenidoEspecifico = "Adopción inicial de tendencias globales como ropa holgada (hip-hop) y las primeras influencias del grunge. Posible continuación de estilos de finales de los 80. La cultura pop estadounidense, incluyendo el hip-hop y el grunge, comenzó a permear la cultura juvenil mexicana. En el ámbito profesional, es probable que se mantuviera cierta influencia del 'power dressing' de los años ochenta.";
                  contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // 1994
                  tituloDelContenidoEspecifico = "Moda 1994: Impacto de la Crisis del Peso";
                  descripcionDelContenidoEspecifico = "Impacto de la crisis del peso llevando a un enfoque en la practicidad y la asequibilidad. Presencia continua de tendencias globales, posiblemente adaptadas a las limitaciones económicas debido a la crisis de 1995.";
                  contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // 1995
                  tituloDelContenidoEspecifico = "Moda 1995: Practicidad y Asequibilidad";
                  descripcionDelContenidoEspecifico = "Impacto de la crisis del peso llevando a un enfoque en la practicidad y la asequibilidad. Presencia continua de tendencias globales, posiblemente adaptadas a las limitaciones económicas debido a la crisis de 1995.";
                  contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 7") { // 1996
                  tituloDelContenidoEspecifico = "Moda 1996: Adaptación de Tendencias Globales a la Economía";
                  descripcionDelContenidoEspecifico = "Impacto de la crisis del peso llevando a un enfoque en la practicidad y la asequibilidad. Presencia continua de tendencias globales, posiblemente adaptadas a las limitaciones económicas debido a la crisis de 1995.";
                  contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 8") { // 1997
                  tituloDelContenidoEspecifico = "Moda 1997: Recuperación Económica e Influencia Mediática";
                  descripcionDelContenidoEspecifico = "Recuperación económica llevando potencialmente a un mayor consumo de moda. Creciente influencia de las telenovelas ('Soñadoras', 'Primer amor, A Mil por Hora') y la música pop mexicana en la moda juvenil. Mayor consolidación de las tendencias del hip-hop y la ropa casual. Hacia finales de la década, surgimiento de elementos del estilo de principios de los 2000 y adopción de tendencias Y2K.";
                  contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 9") { // 1998
                  tituloDelContenidoEspecifico = "Moda 1998: Consolidación de Tendencias Casuales y Pop";
                  descripcionDelContenidoEspecifico = "Recuperación económica llevando potencialmente a un mayor consumo de moda. Creciente influencia de las telenovelas ('Soñadoras', 'Primer amor, A Mil por Hora') y la música pop mexicana en la moda juvenil. Mayor consolidación de las tendencias del hip-hop y la ropa casual. Hacia finales de la década, surgimiento de elementos del estilo de principios de los 2000 y adopción de tendencias Y2K.";
                  contenidoDefinido = true;
              } else if (textosBotonesAnoEspecifico[k] === "Part 10") { // 1999
                  tituloDelContenidoEspecifico = "Moda 1999: Hacia el Estilo Y2K y Fin de Década";
                  descripcionDelContenidoEspecifico = "Recuperación económica llevando potencialmente a un mayor consumo de moda. Creciente influencia de las telenovelas ('Soñadoras', 'Primer amor, A Mil por Hora') y la música pop mexicana en la moda juvenil. Mayor consolidación de las tendencias del hip-hop y la ropa casual. Hacia finales de la década, surgimiento de elementos del estilo de principios de los 2000 y adopción de tendencias Y2K.";
                  contenidoDefinido = true;
              }
            }
            // Aquí irían otros subtemas para 1990 (Música)
          }
          // --- FIN DE LA INTEGRACIÓN DE CONTENIDO PARA ÉPOCA "1990" ---
else if (NOMBRES_SUB_BOTONES[j] === "Arte") {
  if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 2000
    tituloDelContenidoEspecifico = "Arte en 2000: Consolidación e Internacionalización";
    urlDelVideoEspecifico = "assets/musica3.mp4";
    descripcionDelContenidoEspecifico =
      "La década 2000-2010 fue testigo de una notable consolidación, profesionalización e internacionalización de la escena del arte contemporáneo en México. Este proceso, que venía gestándose desde los años noventa, se caracterizó por:\n\n" +
      "- Surgimiento y fortalecimiento de nuevas instituciones y galerías de vanguardia.\n" +
      "- Expansión del mercado del arte mexicano y su creciente visibilidad global.\n" +
      "- Artistas estableciendo un diálogo crítico con realidades socio-políticas, abordando temas como la violencia, la identidad, las fronteras y las estructuras económicas y políticas. :contentReference[oaicite:0]{index=0}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 2001
    tituloDelContenidoEspecifico = "Arte en 2001: Exposiciones Clave en Kurimanzutto";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 2001 destacan las exposiciones individuales en Kurimanzutto:\n\n" +
      "- Daniel Guzmán presenta “Hijo de tu puta madre…” en 2001.\n" +
      "- Gabriel Kuri trabaja junto a Liam Gillick (2003) en proyectos colaborativos significativos.\n" +
      "- Estos eventos marcaron la pauta para la escena experimental y el diálogo internacional que caracterizaría la década. :contentReference[oaicite:1]{index=1}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 2002
    tituloDelContenidoEspecifico = "Arte en 2002: Muestra 1 en Monterrey";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 2002 se celebra “Muestra 1” en Monterrey, precursora de lo que hoy conocemos como Zona MACO:\n\n" +
      "- Organizada por Zélika García Ortiz, reunió a galerías locales e internacionales.\n" +
      "- Sentó las bases para centralizar y profesionalizar el mercado del arte contemporáneo mexicano. :contentReference[oaicite:2]{index=2}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 2003
    tituloDelContenidoEspecifico = "Arte en 2003: Muestra 2 en la CDMX";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 2003 se realiza “Muestra 2” en el World Trade Center (CDMX):\n\n" +
      "- Primera iteración en la capital, ampliando la visibilidad de galerías mexicanas.\n" +
      "- Impulsó la profesionalización del circuito de galerías nacionales e internacionales. :contentReference[oaicite:3]{index=3}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 2004
    tituloDelContenidoEspecifico = "Arte en 2004: Nace oficialmente Zona MACO";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 2004 se consolida MACO MÉXICO ARTE CONTEMPORÁNEO:\n\n" +
      "- Celebrada en Expo Reforma de 2004 a 2006; luego en Residencial Palmas Parque (2007).\n" +
      "- Creció rápidamente en tamaño y participación internacional.\n" +
      "- Se volvió la plataforma comercial líder en América Latina para galerías, artistas, curadores y coleccionistas. :contentReference[oaicite:4]{index=4}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 2005
    tituloDelContenidoEspecifico = "Arte en 2005: Proyectos Monclova y Programas Relevantes";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 2005 se funda Proyectos Monclova como plataforma experimental para artistas emergentes. Además:\n\n" +
      "- Kurimanzutto presenta “Moby Dick” de Damián Ortega (2004) y muestra de Minerva Cuevas (2005).\n" +
      "- Galería OMR participa constantemente en ferias internacionales como ARCOmadrid hasta 2007.\n" +
      "- Estas iniciativas fortalecieron el circuito de galerías de CDMX y su proyección global. :contentReference[oaicite:5]{index=5}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 2006
    tituloDelContenidoEspecifico = "Arte en 2006: Planificación del MUAC y Contexto de Narcoviolencia";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 2006 avanza la construcción del Museo Universitario Arte Contemporáneo (MUAC) en Ciudad Universitaria:\n\n" +
      "- Bajo la dirección de Graciela de la Torre, MUAC se perfila como epicentro de arte público y académico.\n" +
      "- A la par, inicia la ‘guerra contra el narcotráfico’ bajo Felipe Calderón, intensificando la violencia.\n" +
      "- Artistas como Teresa Margolles comienzan a reflejar esta nueva realidad en sus propuestas sociales y conceptuales. :contentReference[oaicite:6]{index=6}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 8") { // Año 2007
    tituloDelContenidoEspecifico = "Arte en 2007: 'La era de la discrepancia' en MUCA Campus";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 2007 se inaugura en MUCA Campus la exposición “La era de la discrepancia. Arte y cultura visual en México, 1968-1997”:\n\n" +
      "- Curada por Olivier Debroise, Cuauhtémoc Medina, Pilar García y Álvaro Vázquez.\n" +
      "- Ofreció una revisión crítica del arte mexicano de décadas anteriores, estableciendo contexto para la escena contemporánea. :contentReference[oaicite:7]{index=7}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 9") { // Año 2008
    tituloDelContenidoEspecifico = "Arte en 2008: Inauguración del MUAC y Expansión de Zona MACO";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En noviembre de 2008 se inaugura el MUAC, diseñado por Teodoro González de León:\n\n" +
      "- Se convierte en institución central para el arte contemporáneo y alberga colecciones desde 1952.\n" +
      "- A la vez, Zona MACO traslada su sede al Centro Banamex, aumentando su escala y prestigio.\n" +
      "- Kurimanzutto abre su espacio permanente en San Miguel Chapultepec en diciembre de 2008.\n" +
      "- Proyectos Monclova amplía su programa con artistas como Germán Venegas (2010). :contentReference[oaicite:8]{index=8}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 10") { // Año 2009
    tituloDelContenidoEspecifico = "Arte en 2009: Teresa Margolles en la Bienal de Venecia";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 2009, Teresa Margolles representa a México en la 53ª Bienal de Venecia con la exposición “¿De qué otra cosa podríamos hablar?”:\n\n" +
      "- Su trabajo, basado en procedimientos de medicina forense, aborda la violencia y la muerte.\n" +
      "- Marca la consolidación internacional del arte socialmente comprometido mexicano. :contentReference[oaicite:9]{index=9}";
    contenidoDefinido = true;
  }
}
else if (NOMBRES_SUB_BOTONES[j] === "Contexto del Chopo") {
  if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 2000
    tituloDelContenidoEspecifico = "Chopo 2000: Diversidad y Era Digital";
    urlDelVideoEspecifico = "assets/con chop 3.mp4";
    descripcionDelContenidoEspecifico =
      "Se amplía la diversidad de tribus urbanas: emo, rap, visual kei.\n" +
      "- El auge de Internet representa un desafío para el éxito comercial del Tianguis, lo que obliga a un mayor enfoque en sus aspectos sociales y culturales.\n" +
      "A pesar de los desafíos de la era digital, el Tianguis mantiene su relevancia como un lugar de encuentro físico y un centro de expresión contracultural."; 
    contenidoDefinido = true; // :contentReference[oaicite:0]{index=0}
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 2001
    tituloDelContenidoEspecifico = "Chopo 2001: Festivales Independientes";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Se organizan festivales musicales independientes vinculados al Chopo.";
    contenidoDefinido = true; // :contentReference[oaicite:1]{index=1}
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 2002
    tituloDelContenidoEspecifico = "Chopo 2002: Búsqueda de Reconocimiento Oficial";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Se inician pláticas con autoridades para reconocimiento como espacio cultural.";
    contenidoDefinido = true; // :contentReference[oaicite:2]{index=2}
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 2003
    tituloDelContenidoEspecifico = "Chopo 2003: Nace el Colectivo OÍ";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Nacen colectivos como OÍ, que promueven arte urbano y activismo.";
    contenidoDefinido = true; // :contentReference[oaicite:3]{index=3}
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 2004
    tituloDelContenidoEspecifico = "Chopo 2004: Documentación en Medios Independientes";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Se documenta la historia del Chopo en medios independientes.";
    contenidoDefinido = true; // :contentReference[oaicite:4]{index=4}
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 2005
    tituloDelContenidoEspecifico = "Chopo 2005: Primer Libro Documental";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Se publica el primer libro documental sobre la historia del tianguis.";
    contenidoDefinido = true; // :contentReference[oaicite:5]{index=5}
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 2006
    tituloDelContenidoEspecifico = "Chopo 2006: Revival del Vinil";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Se incorpora la venta de viniles en crecimiento con el revival analógico.";
    contenidoDefinido = true; // :contentReference[oaicite:6]{index=6}
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 8") { // Año 2007
    tituloDelContenidoEspecifico = "Chopo 2007: Crece el Arte Alternativo";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Aumenta la presencia de tatuadores y artistas visuales alternativos.";
    contenidoDefinido = true; // :contentReference[oaicite:7]{index=7}
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 9") { // Año 2008
    tituloDelContenidoEspecifico = "Chopo 2008: Talleres y Educación Alternativa";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Arrancan actividades de educación alternativa y talleres.";
    contenidoDefinido = true; // :contentReference[oaicite:8]{index=8}
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 10") { // Año 2009
    tituloDelContenidoEspecifico = "Chopo 2009: AH1N1 y Noche de Museos";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "La crisis sanitaria por influenza AH1N1 reduce temporalmente la actividad del tianguis.\n" +
      "El Tianguis Cultural del Chopo comienza su participación en la Noche de Museos, integrándose aún más en la vida cultural de la Ciudad de México.";
    contenidoDefinido = true; // :contentReference[oaicite:9]{index=9}
  }
}
else if (NOMBRES_SUB_BOTONES[j] === "Cine") {
  if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 2000
    tituloDelContenidoEspecifico = "Cine 2000: Internacionalización y Auge del Nuevo Cine Mexicano";
    urlDelVideoEspecifico = "assets/musica5.mp4";
    descripcionDelContenidoEspecifico =
      "El nuevo milenio mostró la consolidación internacional del Nuevo Cine Mexicano con éxitos como Amores Perros (Iñárritu, 2000) y el reconocimiento de largometrajes nacionales en festivales internacionales. A nivel local, la industria inició una recuperación paulatina, apoyada en fondos como FOPROCINE y FIDECINE, aunque la distribución seguía dominada por Hollywood. :contentReference[oaicite:0]{index=0}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 2001
    tituloDelContenidoEspecifico = "Cine 2001: Y tu mamá también y Diversificación de Propuestas";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Y tu mamá también (Cuarón, 2001) confirmó la nueva ola de cineastas mexicanos en el circuito global. Películas como Sin dejar huella (Novaro) y El espinazo del diablo (Del Toro) ganaron reconocimiento, mientras que el documental comenzó a ganar visibilidad en festivales. :contentReference[oaicite:1]{index=1}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 2002
    tituloDelContenidoEspecifico = "Cine 2002: Éxitos Comerciales y Controversias";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "El crimen del padre Amaro (Carrera, 2002) generó polémica y gran taquilla. El documental también creció en exposición. El Ariel (XLIV edición) premió Cuentos de hadas para dormir cocodrilos (Ortiz Cruz) como Mejor Película. :contentReference[oaicite:2]{index=2}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 2003
    tituloDelContenidoEspecifico = "Cine 2003: Consolidación del Independiente";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "La escena independiente se fortaleció con directores como Reygadas y Hermosillo. El Ariel (XLV edición) reconoció El crimen del padre Amaro como Mejor Película y Aro Tolbukhin (Villaronga) obtuvo múltiples premios. :contentReference[oaicite:3]{index=3}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 2004
    tituloDelContenidoEspecifico = "Cine 2004: Nuevas Voces y Primeros Óperas Primas";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "El cine independiente cobró fuerza con premios al Ariel (XLVI edición) para El misterio del Trinidad (García Agraz). Debutaron cineastas como Eimbcke (Temporada de patos) y Lozano (Matando Cabos). :contentReference[oaicite:4]{index=4}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 2005
    tituloDelContenidoEspecifico = "Cine 2005: Éxitos de Temporada de Patos y Documental";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Temporada de patos (Eimbcke, 2005) rompió esquemas y ganó el Ariel (XLVII). El documental también siguió en ascenso, con Voces inocentes (Mandoki) y Mezcal (Ortiz Cruz). :contentReference[oaicite:5]{index=5}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 2006
    tituloDelContenidoEspecifico = "Cine 2006: El Laberinto del Fauno y Reconocimiento Internacional";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "El laberinto del fauno (Del Toro, 2006) obtuvo premios internacionales y el Ariel (XLVIII) reconoció a Mezcal como Mejor Película. Nuevas voces como Reygadas y Estrada también ganaron notoriedad. :contentReference[oaicite:6]{index=6}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 8") { // Año 2007
    tituloDelContenidoEspecifico = "Cine 2007: Consolidación de la Nueva Ola";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 2007 el Ariel (XLIX edición) premió El laberinto del fauno como Mejor Película. La presencia mexicana en Cannes y Venecia se fortaleció, con directores como Reygadas (Luz silenciosa) y Naranjo (Voy a explotar). :contentReference[oaicite:7]{index=7}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 9") { // Año 2008
    tituloDelContenidoEspecifico = "Cine 2008: Diversidad de Géneros y Documental";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "El Ariel (L edición) reconoció Luz silenciosa (Reygadas) como Mejor Película y Los ladrones viejos (González) como Mejor Documental. Lake Tahoe (Eimbcke) marcó el auge de la comedia dramática. :contentReference[oaicite:8]{index=8}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 10") { // Año 2009
    tituloDelContenidoEspecifico = "Cine 2009: Nuevas Voces y Premios Ariel";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Lake Tahoe (Eimbcke, 2009) ganó el Ariel (LI edición). Surgieron directores como Plá (Desierto adentro) y Chenillo (Cinco días sin Nora). El documental siguió ganando terreno con Los herederos (Polgovsky). :contentReference[oaicite:9]{index=9}";
    contenidoDefinido = true;
  }
}

          else if (NOMBRES_SUB_BOTONES[j] === "Música") {
  if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 2000
    tituloDelContenidoEspecifico = "Música 2000: Centro de contracultura y auge del pop latino";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Continuó operando como un importante centro de contracultura. Adaptación al auge de internet que impactó el mercado tradicional de la música. Establecimiento de Radio Chopo, proporcionando plataforma para bandas independientes y establecidas. El pop latino experimentó un auge con artistas como Enrique Iglesias alcanzando éxito global. La música regional mexicana creció en popularidad. El rock en español mantuvo un seguimiento fuerte. Se establecen los Premios Grammy Latinos en el año 2000. :contentReference[oaicite:0]{index=0}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 2001
    tituloDelContenidoEspecifico = "Música 2001: Santa Sabina";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Santa Sabina lanza “Mar Adentro en la Sangre”. Con una mezcla de rock gótico y jazz, ofrecieron una propuesta única. Su participación en festivales fortaleció su vínculo con el público del Chopo. :contentReference[oaicite:1]{index=1}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 2002
    tituloDelContenidoEspecifico = "Música 2002: Zoé";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Zoé se consolida como una de las bandas más representativas del rock alternativo en México. Su presentación en el Tianguis Cultural del Chopo en 2002 marcó un hito en su carrera y en la escena independiente nacional. :contentReference[oaicite:2]{index=2}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 2003
    tituloDelContenidoEspecifico = "Música 2003: La Candelaria";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "La Candelaria fusiona rock, hip hop, salsa y funk, influyendo en la música independiente mexicana y participando activamente en la escena del Chopo. :contentReference[oaicite:3]{index=3}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 2004
    tituloDelContenidoEspecifico = "Música 2004: Porter";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Porter lanza _Donde los Ponys Pastan_. Originarios de Guadalajara, aportan una propuesta fresca al indie rock mexicano. Su álbum se vende en el Tianguis del Chopo, fortaleciendo su conexión con la escena underground. :contentReference[oaicite:4]{index=4}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 2005
    tituloDelContenidoEspecifico = "Música 2005: Austin TV";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Austin TV publica _La Última Noche del Mundo_. Banda de post rock instrumental conocida por el uso de máscaras y el lema “Tu cara no importa, importas tú”. Su propuesta genera una conexión profunda con el público del Chopo. :contentReference[oaicite:5]{index=5}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 2006
    tituloDelContenidoEspecifico = "Música 2006: Panteón Rococó";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Panteón Rococó edita _Tres Veces Tres_. Fusionan ska, punk y ritmos latinos, convirtiéndose en referentes del activismo musical. Su participación en eventos del Chopo y su compromiso social resuenan con las juventudes mexicanas. :contentReference[oaicite:6]{index=6}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 8") { // Año 2007
    tituloDelContenidoEspecifico = "Música 2007: Porter (segundo álbum)";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Porter publica _Atemahawke_, consolidando su estilo experimental y líricas surrealistas. Su segundo álbum los convierte en una de las bandas más influyentes de la escena alternativa mexicana. :contentReference[oaicite:7]{index=7}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 9") { // Año 2008
    tituloDelContenidoEspecifico = "Música 2008: She’s a Tease";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "She’s a Tease publica _Millonaria_. Banda regiomontana que combina electrónica y rock, ganando popularidad en la escena indie y formando parte de la oferta musical del Chopo. :contentReference[oaicite:8]{index=8}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 10") { // Año 2009
    tituloDelContenidoEspecifico = "Música 2009: Jotdog";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Jotdog lanza _Jotdog_. Dúo de pop y rock pop mexicano que logra fama con su sencillo “Hasta Contar a Mil”, siendo reconocidos en la escena musical y participando en eventos culturales del Chopo. :contentReference[oaicite:9]{index=9}";
    contenidoDefinido = true;
  }
}
else if (NOMBRES_SUB_BOTONES[j] === "Contexto México") {
  if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 2000
    tituloDelContenidoEspecifico = "Contexto México 2000: Era de la Alternancia";
    urlDelVideoEspecifico = "assets/musica6.mp4";
    descripcionDelContenidoEspecifico =
      "Vicente Fox del PAN fue elegido presidente, poniendo fin a más de 70 años de gobierno del PRI. Esta transición pacífica marcó un hito en la consolidación democrática de México, abriendo la puerta a nuevas orientaciones políticas y mayor pluralidad en el poder. :contentReference[oaicite:0]{index=0}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 2001
    tituloDelContenidoEspecifico = "Contexto México 2001: EZLN y Consecuencias del 11 de Septiembre";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En marzo, el EZLN marchó a la Ciudad de México exigiendo reconocimiento de derechos indígenas tras los Acuerdos de San Andrés. El Congreso aprobó reformas limitadas, lo que fracturó el diálogo. Además, tras los atentados del 11 de septiembre en EE.UU., se frenó la reforma migratoria bilateral y se endurecieron controles fronterizos, impactando a migrantes mexicanos. :contentReference[oaicite:1]{index=1}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 2002
    tituloDelContenidoEspecifico = "Contexto México 2002: Tensiones Sociales y Mundial de Fútbol";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Surgen voces feministas y LGBTIQ+ que denuncian violencia y discriminación. El gobierno de Fox crea la Comisión de la Verdad, pero sin autonomía real. México compite en el Mundial de 2002, pasa la fase de grupos pero es eliminado por EE.UU. en octavos, generando decepción nacional. :contentReference[oaicite:2]{index=2}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 2003
    tituloDelContenidoEspecifico = "Contexto México 2003: Último Vocho y Elecciones Intermedias";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "El 30 de julio sale de la línea de producción el último Volkswagen Sedán en Puebla, cerrando un capítulo de la industria automotriz nacional. En las elecciones intermedias, el PRI recupera fuerza en la Cámara de Diputados. México es coanfitrión y campeón en la Copa Oro 2003, venciendo a Brasil 1-0 con gol de oro de Daniel Osorno. El 13 de marzo se crea el Instituto de las Lenguas Indígenas para preservar y promover la diversidad lingüística. :contentReference[oaicite:3]{index=3}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 2004
    tituloDelContenidoEspecifico = "Contexto México 2004: Elecciones Estatales y Éxitos Olímpicos";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Se celebran elecciones en varios estados; en el Estado de México Enrique Peña Nieto es elegido gobernador, marcando el inicio de su ascenso político. En los Juegos Olímpicos de Atenas 2004, México participa con 109 atletas en 20 disciplinas y obtiene tres medallas de plata y una de bronce: Ana Guevara (plata en 400 m), Belem Guerrero (plata en ciclismo de pista). Luis Miguel lanza el álbum _México en la Piel_ y estrenan películas mexicanas con reconocimiento internacional. :contentReference[oaicite:4]{index=4}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 2005
    tituloDelContenidoEspecifico = "Contexto México 2005: Ciencia y Desastres Naturales";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Investigadores inician un estudio sísmico en Chicxulub para analizar el cráter del asteroide que extinguió a los dinosaurios. Durante el MTV Spring Break en Cancún, 50 Cent se presenta, y My Chemical Romance en CDMX. En julio, el Huracán Emily alcanza categoría 5, afectando Yucatán y noreste del país con daños de más de 8.87 mil millones de pesos y cinco muertes. En octubre, el Huracán Wilma, el más intenso del Atlántico hasta entonces, causa ocho muertes y 442 millones de dólares en daños. :contentReference[oaicite:5]{index=5}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 2006
    tituloDelContenidoEspecifico = "Contexto México 2006: Guerra contra el Narcotráfico";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Felipe Calderón (PAN) es electo presidente en una contienda controvertida. Lanza una ofensiva militar contra los cárteles, iniciando la guerra contra el narcotráfico, lo que dispara la violencia, abusos contra derechos humanos e inestabilidad social. :contentReference[oaicite:6]{index=6}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 8") { // Año 2007
    tituloDelContenidoEspecifico = "Contexto México 2007: Inundaciones en Tabasco";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Graves inundaciones azotan Tabasco, evidenciando la vulnerabilidad ante desastres naturales. El gobierno y la sociedad civil deben coordinar esfuerzos para la recuperación y prevención de futuras catástrofes. :contentReference[oaicite:7]{index=7}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 9") { // Año 2008
    tituloDelContenidoEspecifico = "Contexto México 2008: Aumento de la Violencia";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Se registra un incremento significativo de la violencia en todo el país derivada de la guerra contra el narcotráfico, con miles de muertes. Este fenómeno afecta la seguridad pública, la inversión y la calidad de vida en varias regiones. :contentReference[oaicite:8]{index=8}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 10") { // Año 2009
    tituloDelContenidoEspecifico = "Contexto México 2009: Pandemia de Influenza H1N1";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En marzo se detecta el primer caso de H1N1 en Veracruz; el 22 de abril, la Secretaría de Salud emite alerta nacional tras 20 muertes sospechosas. El 23 de abril se suspenden clases en CDMX y EdoMex, cerrando escuelas, cines, museos y restaurantes. El presidente Felipe Calderón declara emergencia sanitaria nacional. En julio se celebran elecciones federales para renovar la Cámara de Diputados, el PRI gana mayoría relativa. La economía se contrae un 6.5% debido a la recesión global y la pandemia. La guerra contra el narcotráfico continúa, con violencia persistente, especialmente en Chihuahua, Sinaloa y Tamaulipas. :contentReference[oaicite:9]{index=9}";
    contenidoDefinido = true;
  }
}
else if (NOMBRES_SUB_BOTONES[j] === "Moda") {
  if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 2000
    tituloDelContenidoEspecifico = "Moda 2000: Años Y2K y fusión global";
    urlDelVideoEspecifico = "assets/musica5.mp4";
    descripcionDelContenidoEspecifico =
      "En 2000 predominó la estética Y2K: brillos metálicos, jeans tiro bajo y crop tops. El estilo deportivo tenía gran presencia; el fenómeno pop latino influyó fuertemente en prendas femeninas. Los hombres adoptaron tendencias deportivas y militares. Los jóvenes usaban uniformes escolares estilizados (p. ej. de Locura de Amor) y looks inspirados en el pop estadounidense. :contentReference[oaicite:0]{index=0}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 2001
    tituloDelContenidoEspecifico = "Moda 2001: Influencia de telenovelas y estilos casuales";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "La telenovela Amigas y Rivales popularizó el estilo ‘look mojado’ y prendas casuales deportivas. En moda femenina continuaron los crop tops y cárdigans con minifaldas; en masculina, seguían la línea deportiva y aparecían jeans cargo. La moda juvenil reflejó tanto tendencias globales de hip-hop como influencias de Clase 406 con pantalones cargo y accesorios específicos. :contentReference[oaicite:1]{index=1}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 2002
    tituloDelContenidoEspecifico = "Moda 2002: Combate de influencias y moda juvenil";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "A inicios de 2002 la moda femenina incluía vestidos lenceros, conjuntos de cárdigan y minifalda, tacones bajos. Los hombres seguían con looks deportivos y militares, pero emergían estilos retro de influencia indie/rock. Los jóvenes fusionaban esas corrientes con la moda escolar de Clase 406, llevando camisetas de bandas y elementos góticos en el Chopo. :contentReference[oaicite:2]{index=2}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 2003
    tituloDelContenidoEspecifico = "Moda 2003: Tendencias emergentes y ‘Rebelde’ en puerta";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 2003, las mujeres portaban jeans de tiro bajo y blusas deportivas, pero ya se asomaba la estética preppy de Rebelde (estreno en 2004). Los hombres empezaban a combinar chaquetas ligeras con jeans ajustados; la influencia indie crecía. En el Chopo seguían presentes camisetas de bandas y accesorios alternativos—tachuelas, chaquetas de mezclilla decoradas—mientras la moda juvenil se alineaba con la escena gótica y skate. :contentReference[oaicite:3]{index=3}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 2004
    tituloDelContenidoEspecifico = "Moda 2004: ‘Rebelde’ y auge del boho-chic";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Con Rebelde en pantalla (2004), la moda preppy (faldas tableadas, corbatas finas) se puso de moda entre adolescentes. En el ámbito femenino también destacó el boho-chic: vestidos fluidos y estampados vintage. Los hombres adoptaron looks más formales—camisas entalladas y chaquetas casuales. La moda juvenil en el Chopo se inclinó por el estilo emo, con camisetas oscuras y accesorios metálicos. :contentReference[oaicite:4]{index=4}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 2005
    tituloDelContenidoEspecifico = "Moda 2005: ‘Skinny jeans’ y Primavera Boho";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Para 2005 los skinny jeans ya eran omnipresentes en mujeres y hombres. El boho-chic evolucionó con túnicas largas y estampados étnicos. La moda masculina combinó chaquetas ligeras con camisas ajustadas. En el ámbito juvenil, seguía fuerte la influencia emo y post-punk; en el Chopo se veían camisetas de bandas, chaquetas con tachuelas y accesorios oscuros. :contentReference[oaicite:5]{index=5}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 2006
    tituloDelContenidoEspecifico = "Moda 2006: Acento en denim y revival de los 90";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 2006 el denim era rey: jeans ajustados (skinny) y chaquetas de mezclilla reciclada. La estética de los 90 resurgió con camisetas oversize y calzado deportivo retro. Las mujeres usaban crop tops y jeans de tiro medio. Los jóvenes exploraban la moda ‘scene’, con coloridos peinados y accesorios llamativos. En el Chopo seguían predominando los atuendos oscuros de corte gótico y punk. :contentReference[oaicite:6]{index=6}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 8") { // Año 2007
    tituloDelContenidoEspecifico = "Moda 2007: Neón ochentero y estampados llamativos";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Para 2007 regresaron los colores neón y estampados inspirados en los 80 s: chaquetas con hombreras, accesorios metálicos y leggins brillantes. En mujeres se usaban vestidos cortos con prints coloridos; en hombres, camisetas gráficas y chaquetas entalladas. La moda juvenil exploró más la estética ‘scene’, con peinados voluminosos y maquillaje llamativo. El Chopo siguió siendo punto de venta para prendas custom (chaquetas pintadas, calaveras). :contentReference[oaicite:7]{index=7}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 9") { // Año 2008
    tituloDelContenidoEspecifico = "Moda 2008: Fusionando retro y minimalismo";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "En 2008 la moda femenina combinó retazos ochenteros (neón suave) con un regreso al minimalismo: vestidos lisos y tacones discretos. Los hombres optaron por looks smart-casual: camisas sin corbata, jeans oscuros. La escena juvenil alternó entre estética emo-gótica y minimalismo indie. En el Chopo era común ver combinaciones de camisetas de bandas con jeans ajustados y botas militares. :contentReference[oaicite:8]{index=8}";
    contenidoDefinido = true;
  }
  else if (textosBotonesAnoEspecifico[k] === "Part 10") { // Año 2009
    tituloDelContenidoEspecifico = "Moda 2009: Consolidación del boho y revival vintage";
    urlDelVideoEspecifico = null;
    descripcionDelContenidoEspecifico =
      "Hacia 2009 el boho-chic llegó a su pico: vestidos largos, sandalias gladiador y accesorios con borlas. Las mujeres usaban sombreros floppy y estampados florales. Los hombres reincorporaron el estilo retro con chalecos y estampados sutiles. Los jóvenes renovaron el interés por lo vintage: camisetas de grupos ochenteros y accesorios reciclados. El Chopo seguía mostrando artesanías de moda alternativa y prendas custom de inspiración retro. :contentReference[oaicite:9]{index=9}";
    contenidoDefinido = true;
  }
}
   // --- INICIO DE LA INTEGRACIÓN DE CONTENIDO PARA ÉPOCA "2010" (ARTE) ---

// --- FIN DE LA INTEGRACIÓN DE CONTENIDO PARA ÉPOCA "2010" (ARTE) ---

// Comprobación de contenido por defecto en caso de que no se haya definido nada específico:
if (!contenidoDefinido) {
  // … asigna título, url y descripción genéricos …
}

// …después de terminar el bloque “else if (textosBotonesEpocas[i] === "1990") { … }”…

// --- INICIO DE LA INTEGRACIÓN DE CONTENIDO PARA ÉPOCA "2010" ---
// …  EN EL CONTEXTO DEL for (i = 0; i < textosBotonesEpocas.length; i++) {
//       for (j = 0; j < NOMBRES_SUB_BOTONES.length; j++) {
//         for (k = 0; k < textosBotonesAnoEspecifico.length; k++) {
  
          // Variables auxiliares (se asumen ya definidas arriba):
          //   let tituloDelContenidoEspecifico = "";
          //   let urlDelVideoEspecifico = null;
          //   let descripcionDelContenidoEspecifico = "";
          //   let contenidoDefinido = false;

          // ------------- BLOQUES PARA ÉPOCAS ANTERIORES (1980, 1990, 2000) -------------

          // … aquí van tus if (textosBotonesEpocas[i] === "1980") { … } 
          // … y el bloque entero de 1990 …
          // … y el bloque entero de 2000 (si lo tienes) …

          // ---------------- INICIO BLOQUE CORREGIDO PARA 2010 ----------------
          // --- PEGA ESTE BLOQUE COMPLETO PARA LA ÉPOCA 2010 ---
// --- COPIA Y PEGA ESTE BLOQUE COMPLETO PARA REEMPLAZAR TU BLOQUE ACTUAL DE "2010" ---
// --- COPIA Y PEGA ESTE BLOQUE COMPLETO PARA REEMPLAZAR TU BLOQUE ACTUAL DE "2010" ---
// --- COPIA Y PEGA ESTE BLOQUE COMPLETO PARA REEMPLAZAR TU BLOQUE ACTUAL DE "2010" ---
// --- COPIA Y PEGA ESTE BLOQUE COMPLETO PARA REEMPLAZAR TU BLOQUE ACTUAL DE "2010" ---
else if (textosBotonesEpocas[i] === "2010") {
  // SUBTEMA: Contexto del Chopo
  if (NOMBRES_SUB_BOTONES[j] === "Contexto del Chopo") {
    if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 2010
      tituloDelContenidoEspecifico = "Chopo 2010: Diversidad y Era Digital";
      urlDelVideoEspecifico = "assets/con chop2.mp4";
      descripcionDelContenidoEspecifico =
        "Se amplía la diversidad de tribus urbanas: emo, rap, visual kei.\n" +
        "- El auge de Internet representa un desafío para el éxito comercial del Tianguis, lo que obliga a un mayor enfoque en sus aspectos sociales y culturales.\n" +
        "A pesar de los desafíos de la era digital, el Tianguis mantiene su relevancia como un lugar de encuentro físico y un centro de expresión contracultural.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 2011
      tituloDelContenidoEspecifico = "Chopo 2011: Festivales Independientes";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Se organizan festivales musicales independientes vinculados al Chopo.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 2012
      tituloDelContenidoEspecifico = "Chopo 2012: Espacios de Arte Urbano";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Aparecen festivales de arte urbano y graffiti en los pasillos del Chopo.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 2013
      tituloDelContenidoEspecifico = "Chopo 2013: Crecimiento del Escenario Indie";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Bandas indie mexicanas consolidan audiencias en el Tianguis, aprovechando redes sociales para su promoción.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 2014
      tituloDelContenidoEspecifico = "Chopo 2014: Streaming y Redes Sociales";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "El auge del streaming y de las redes sociales cambia la forma en que se comparte música, pero el Chopo sigue siendo punto de interacción directa.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 2015
      tituloDelContenidoEspecifico = "Chopo 2015: Redes de Colaboración Cultural";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Se fortalecen alianzas con colectivos de cultura urbana, talleres y ferias de editoriales independientes dentro del Tianguis.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 2016
      tituloDelContenidoEspecifico = "Chopo 2016: Internacionalización y Foros Temáticos";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Visitas de sellos internacionales, foros temáticos de discusión sobre DIY y cultura libre.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 8") { // Año 2017
      tituloDelContenidoEspecifico = "Chopo 2017: Arte Intervenido y Grafiti";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Mayor presencia de artistas gráficos, intervenciones en vivo y talleres de street art dentro del tianguis.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 9") { // Año 2018
      tituloDelContenidoEspecifico = "Chopo 2018: Resiliencia ante la Digitalización";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Aunque las plataformas digitales absorben parte de la venta de mercancía, el Chopo refuerza su propuesta de experiencia presencial y comunitaria.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 10") { // Año 2019
      tituloDelContenidoEspecifico = "Chopo 2019: Celebración de 39 Años";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "El Tianguis celebra 39 años con eventos especiales, retrospectivas fotográficas y conciertos conmemorativos de escena underground.";
      contenidoDefinido = true;
    }
  }
  // SUBTEMA: Cine
  else if (NOMBRES_SUB_BOTONES[j] === "Cine") {
    if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 2010
      tituloDelContenidoEspecifico = "Cine 2010: Diversidad, Arieles y Auge de Géneros";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "La década de 2010 se caracterizó por una notable expansión y diversificación del cine mexicano, con una producción anual superando consistentemente las 100 películas, impulsada por estímulos fiscales (EFICINE) y fondos de IMCINE (FOPROCINE, FIDECINE).\n\n" +
        "**Películas Destacadas de 2010 y Premios Ariel (para películas de 2009):**\n" +
        "Los Premios Ariel (LII edición) reconocieron a 'Cinco días sin Nora' de Mariana Chenillo como Mejor Película y Mejor Ópera Prima. Carlos Carrera ganó como Mejor Director por 'Backyard: El traspatio'.\n\n" +
        "Películas Notables de 2010:\n" +
        "- Cinco días sin Nora (Dir. Mariana Chenillo)\n" +
        "- Backyard: El traspatio (Dir. Carlos Carrera)\n" +
        "- Norteado (Dir. Rigoberto Perezcano)\n" +
        "- Corazón del tiempo (Dir. Alberto Cortés)\n" +
        "- El Narco (El infierno) (Dir. Luis Estrada)\n" +
        "- Abel (Ópera Prima, Dir. Diego Luna)\n" +
        "- Año bisiesto (Ópera Prima, Dir. Michael Rowe)\n" +
        "- Biutiful (Dir. Alejandro G. Iñárritu)\n" +
        "- Somos lo que hay (Ópera Prima, Dir. Jorge Michel Grau)\n" +
        "- Hidalgo: La historia jamás contada (Dir. Antonio Serrano)";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 2011
      tituloDelContenidoEspecifico = "Cine 2011: 'El Infierno' Domina los Arieles";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Luis Estrada triunfa en los Arieles con 'El infierno'.\n" +
        "Los Premios Ariel (LIII edición, para películas de 2010) galardonaron a 'El Narco (El infierno)' como Mejor Película y a Luis Estrada como Mejor Director. 'Abel' de Diego Luna también fue reconocida.\n\n" +
        "**Películas Destacadas de 2011:**\n" +
        "- El Narco (El infierno) (Dir. Luis Estrada)\n" +
        "- Abel (Dir. Diego Luna)\n" +
        "- Chicogrande (Dir. Felipe Cazals)\n" +
        "- Año bisiesto (Dir. Michael Rowe)\n" +
        "- Las buenas hierbas (Dir. María Novaro)\n" +
        "- Biutiful (Dir. Alejandro G. Iñárritu)\n" +
        "- Pastorela (Dir. Emilio Portes)\n" +
        "- Días de gracia (Ópera Prima, Dir. Everardo Gout)\n" +
        "- Miss Bala (Dir. Gerardo Naranjo)\n" +
        "- La historia en la mirada (Documental, Dir. José Ramón Mikelajáuregui)";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 2012
      tituloDelContenidoEspecifico = "Cine 2012: 'Pastorela' y Continuidad en Producción";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "La producción cinematográfica siguió diversificándose.\n" +
        "Los Premios Ariel (LIV edición, para películas de 2011) reconocieron a 'Pastorela' de Emilio Portes como Mejor Película y Mejor Director. 'Días de gracia' de Everardo Gout fue la más premiada y ganó Ópera Prima.\n\n" +
        "**Películas Destacadas de 2012:**\n" +
        "- Pastorela (Dir. Emilio Portes)\n" +
        "- Días de gracia (Dir. Everardo Gout)\n" +
        "- Miss Bala (Dir. Gerardo Naranjo)\n" +
        "- El lugar más pequeño (Documental, Ópera Prima, Dir. Tatiana Huezo)\n" +
        "- Martha (Dir. Marcelino Islas Hernández)\n" +
        "- Acorazado (Dir. Álvaro Curiel)\n" +
        "- Victorio (Dir. Alex Noppel)\n" +
        "- La demora (Dir. Rodrigo Plá)\n" +
        "- El premio (Ópera Prima, Dir. Paula Markovitch)\n" +
        "- Post Tenebras Lux (Dir. Carlos Reygadas)";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 2013
      tituloDelContenidoEspecifico = "Cine 2013: Auge de Comedia y 'El Premio' en Arieles";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Fue un año de grandes éxitos de taquilla para la comedia mexicana, como 'Nosotros los Nobles' y 'No se aceptan devoluciones'.\n" +
        "Los Premios Ariel (LV edición, para películas de 2012) galardonaron a 'El premio' de Paula Markovitch como Mejor Película y Mejor Ópera Prima. Rodrigo Plá ganó como Mejor Director por 'La demora'.\n\n" +
        "**Películas Destacadas de 2013:**\n" +
        "- El premio (Dir. Paula Markovitch)\n" +
        "- La demora (Dir. Rodrigo Plá)\n" +
        "- La vida precoz y breve de Sabina Rivas (Dir. Luis Mandoki)\n" +
        "- Los últimos cristeros (Dir. Matías Meyer)\n" +
        "- Heli (Dir. Amat Escalante)\n" +
        "- Nosotros los Nobles (Ópera Prima, Dir. Gary Alazraki)\n" +
        "- No se aceptan devoluciones (Ópera Prima, Dir. Eugenio Derbez)\n" +
        "- La jaula de oro (Ópera Prima, Dir. Diego Quemada-Diez)\n" +
        "- Club Sándwich (Dir. Fernando Eimbcke)\n" +
        "- Quebranto (Documental, Dir. Roberto Fiesco)";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 2014
      tituloDelContenidoEspecifico = "Cine 2014: 'La Jaula de Oro' Reconocida";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "'La jaula de oro' arrasa en los Arieles.\n" +
        "Los Premios Ariel (LVI edición, para películas de 2013) reconocieron a 'La jaula de oro' de Diego Quemada-Diez como Mejor Película y Mejor Ópera Prima. Amat Escalante ganó como Mejor Director por 'Heli'.\n\n" +
        "**Películas Destacadas de 2014:**\n" +
        "- La jaula de oro (Dir. Diego Quemada-Diez)\n" +
        "- Heli (Dir. Amat Escalante)\n" +
        "- Los insólitos peces gato (Ópera Prima, Dir. Claudia Sainte-Luce)\n" +
        "- Club Sándwich (Dir. Fernando Eimbcke)\n" +
        "- Tercera llamada (Dir. Francisco Franco)\n" +
        "- No quiero dormir sola (Dir. Natalia Beristáin)\n" +
        "- Ciudadano Buelna (Dir. Felipe Cazals)\n" +
        "- Güeros (Ópera Prima, Dir. Alonso Ruizpalacios)\n" +
        "- Las oscuras primaveras (Dir. Ernesto Contreras)\n" +
        "- Cantinflas (Dir. Sebastián del Amo)";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 2015
      tituloDelContenidoEspecifico = "Cine 2015: 'Güeros' y su Impacto";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "'Güeros' se consolida como un referente del cine contemporáneo.\n" +
        "Los Premios Ariel (LVII edición, para películas de 2014) galardonaron a 'Güeros' de Alonso Ruizpalacios como Mejor Película, Mejor Ópera Prima y Mejor Director.\n\n" +
        "**Películas Destacadas de 2015:**\n" +
        "- Güeros (Dir. Alonso Ruizpalacios)\n" +
        "- Carmín tropical (Dir. Rigoberto Perezcano)\n" +
        "- Guten Tag, Ramón (Dir. Jorge Ramírez Suárez)\n" +
        "- La dictadura perfecta (Dir. Luis Estrada)\n" +
        "- Las oscuras primaveras (Dir. Ernesto Contreras)\n" +
        "- Las elegidas (Dir. David Pablos)\n" +
        "- 600 millas (Ópera Prima, Dir. Gabriel Ripstein)\n" +
        "- Gloria (Dir. Christian Keller)\n" +
        "- La delgada línea amarilla (Ópera Prima, Dir. Celso R. García)\n" +
        "- Un monstruo de mil cabezas (Dir. Rodrigo Plá)";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 2016
      tituloDelContenidoEspecifico = "Cine 2016: Producción Récord y 'Las Elegidas' en Arieles";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "La producción cinematográfica alcanza un nuevo récord histórico.\n" +
        "Los Premios Ariel (LVIII edición, para películas de 2015) reconocieron a 'Las elegidas' de David Pablos como Mejor Película y Mejor Director. '600 millas' de Gabriel Ripstein ganó Ópera Prima. La comedia '¿Qué culpa tiene el niño?' fue un éxito de taquilla.\n\n" +
        "**Películas Destacadas de 2016:**\n" +
        "- Las elegidas (Dir. David Pablos)\n" +
        "- 600 millas (Dir. Gabriel Ripstein)\n" +
        "- Gloria (Dir. Christian Keller)\n" +
        "- La delgada línea amarilla (Dir. Celso R. García)\n" +
        "- Un monstruo de mil cabezas (Dir. Rodrigo Plá)\n" +
        "- El Jeremías (Ópera Prima, Dir. Anwar Safa)\n" +
        "- Mexican Gangster. La leyenda del charro misterioso (Dir. José Manuel Cravioto)\n" +
        "- Te prometo anarquía (Dir. Julio Hernández Cordón)\n" +
        "- La 4ª Compañía (Ópera Prima, Dir. Amir Galván Cervera, Mitzi Vanessa Arreola)\n" +
        "- Tempestad (Documental, Dir. Tatiana Huezo)";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 8") { // Año 2017
      tituloDelContenidoEspecifico = "Cine 2017: Tatiana Huezo y 'La 4ª Compañía' en Arieles";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Tatiana Huezo hace historia en los Arieles.\n" +
        "Los Premios Ariel (LIX edición, para películas de 2016) otorgaron el premio a Mejor Película a 'La 4ª Compañía'. Tatiana Huezo ganó como Mejor Directora por 'Tempestad', siendo la primera mujer en obtener este galardón.\n\n" +
        "**Películas Destacadas de 2017:**\n" +
        "- La 4ª Compañía (Dir. Amir Galván Cervera, Mitzi Vanessa Arreola)\n" +
        "- Tempestad (Documental, Dir. Tatiana Huezo)\n" +
        "- Desierto (Dir. Jonás Cuarón)\n" +
        "- El sueño del Mara'akame (Ópera Prima, Dir. Federico Cecchetti)\n" +
        "- Me estás matando, Susana (Dir. Roberto Sneider)\n" +
        "- Bellas de noche (Documental, Ópera Prima, Dir. María José Cuevas)\n" +
        "- La región salvaje (Dir. Amat Escalante)\n" +
        "- Almacenados (Dir. Jack Zagha Kababie)\n" +
        "- La caridad (Dir. Marcelino Islas Hernández)\n" +
        "- Sueño en otro idioma (Dir. Ernesto Contreras)";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 9") { // Año 2018
      tituloDelContenidoEspecifico = "Cine 2018: Éxito de 'Roma' y Arieles para 'Sueño en Otro Idioma'";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "'Roma' de Alfonso Cuarón inicia su camino de éxito global.\n" +
        "Los Premios Ariel (LX edición, para películas de 2017) reconocieron a 'Sueño en otro idioma' de Ernesto Contreras como Mejor Película. Amat Escalante ganó como Mejor Director por 'La región salvaje'.\n\n" +
        "**Películas Destacadas de 2018:**\n" +
        "- Sueño en otro idioma (Dir. Ernesto Contreras)\n" +
        "- La región salvaje (Dir. Amat Escalante)\n" +
        "- La libertad del diablo (Documental, Dir. Everardo González)\n" +
        "- Batallas íntimas (Documental, Dir. Lucía Gajá)\n" +
        "- Tiempo compartido (Dir. Sebastian Hofmann)\n" +
        "- Los adioses (Dir. Natalia Beristáin)\n" +
        "- Vuelven (Ópera Prima, Dir. Issa López)\n" +
        "- Las hijas de Abril (Dir. Michel Franco)\n" +
        "- Oso polar (Ópera Prima, Dir. Marcelo Tobar)\n" +
        "- Roma (Dir. Alfonso Cuarón)";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 10") { // Año 2019 y Resumen de la Década
      tituloDelContenidoEspecifico = "Cine 2010s: Cierre de Década, Streaming y Retos (2019)";
      urlDelVideoEspecifico = "assets/musica5.mp4";
      descripcionDelContenidoEspecifico =
        "**Resumen de la Década (2010-2019) para Cine Mexicano:**\n" +
        "La década de 2010 se caracterizó por un notable aumento en la producción de largometrajes, superando consistentemente las 100 películas anuales e incluso llegando a más de 200 hacia el final.\n" +
        "Hubo un auge de la comedia mexicana con éxitos de taquilla sin precedentes.\n" +
        "El cine documental mexicano continuó su consolidación y reconocimiento.\n" +
        "A pesar del crecimiento productivo, la cuota de mercado del cine mexicano en salas comerciales siguió siendo baja comparada con Hollywood, y muchas películas enfrentaron dificultades de distribución.\n" +
        "Los festivales de cine y los circuitos alternativos se volvieron cruciales.\n" +
        "Las plataformas de streaming comenzaron a transformar el panorama como exhibidoras y productoras.\n" +
        "A nivel internacional, directores mexicanos como Cuarón, Iñárritu y Del Toro cosecharon múltiples premios Oscar.\n\n" +
        "**Cine en 2019 (Placeholder - Añadir información específica si se tiene):\n**" +
        "El año 2019 continuó la tendencia de alta producción y éxitos puntuales de taquilla. (Se necesitarían datos de los Premios Ariel para películas de 2018 y un listado de películas destacadas de 2019 para completar esta sección).";
      contenidoDefinido = true;
    }
  }
  // SUBTEMA: Música
  else if (NOMBRES_SUB_BOTONES[j] === "Música") {
    if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 2010
      tituloDelContenidoEspecifico = "Música 2010: Tendencias y Bandas Destacadas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "**Tendencias Generales de la Década (2010-2025):**\n" +
        "Los géneros urbanos latinos como el reguetón y el trap latino ganaron una inmensa popularidad, influyendo también en la música mexicana. Se hizo más común la fusión de la música regional mexicana con otros géneros, incluyendo el pop, el rock e incluso estilos urbanos. Artistas como Natalia Lafourcade obtuvieron reconocimiento de la crítica por su mezcla de folclore tradicional mexicano con sonidos contemporáneos.\n\n" +
        "**Banda Mexicana Influyente 2010:**\n" +
        "- **Le Butcherettes** (Guadalajara)\n" +
        "  - Álbum: Sin Sin Sin\n" +
        "  - Canción clave: \"Henry Don't Got Love\"\n" +
        "  - Impacto: Con su fusión de punk y performance, lideradas por Teri Gender-Bender, revitalizaron la escena punk mexicana y ganaron reconocimiento internacional.\n\n" +
        "**Banda Internacional Influyente 2010:**\n" +
        "- **Arcade Fire** (Canadá)\n" +
        "  - Álbum: The Suburbs\n" +
        "  - Canción clave: \"Ready to Start\"\n" +
        "  - Impacto: Este álbum consolidó a Arcade Fire como una de las bandas más influyentes del indie rock, explorando temas de nostalgia y crecimiento suburbano.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 2011
      tituloDelContenidoEspecifico = "Música 2011: Bandas Destacadas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "**Banda Mexicana Influyente 2011:**\n" +
        "- **URSS Bajo el Árbol** (Ciudad de México)\n" +
        "  - Álbum: LIN3AS M3NTAL3S (EP)\n" +
        "  - Canción clave: \"Contra Sí Mismo\"\n" +
        "  - Impacto: Su rock progresivo y psicodélico los posicionó como una de las bandas más representativas del género en México, destacando por su propuesta introspectiva y conceptual.\n\n" +
        "**Banda Internacional Influyente 2011:**\n" +
        "- **Foster the People** (Estados Unidos)\n" +
        "  - Álbum: Torches\n" +
        "  - Canción clave: \"Pumped Up Kicks\"\n" +
        "  - Impacto: Con su mezcla de pop y electrónica, la banda capturó la atención global, abordando temas oscuros con melodías pegajosas.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 2012
      tituloDelContenidoEspecifico = "Música 2012: Bandas Destacadas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "**Banda Mexicana Influyente 2012:**\n" +
        "- **Sonido Gallo Negro** (Ciudad de México)\n" +
        "  - Álbum: Cumbia Salvaje\n" +
        "  - Canción clave: \"Selvática\"\n" +
        "  - Impacto: Este colectivo fusionó cumbia andina con elementos electrónicos y actitud garage, revitalizando la cumbia psicodélica en la escena alternativa mexicana.\n\n" +
        "**Banda Internacional Influyente 2012:**\n" +
        "- **Tame Impala** (Australia)\n" +
        "  - Álbum: Lonerism\n" +
        "  - Canción clave: \"Elephant\"\n" +
        "  - Impacto: Este trabajo consolidó a Tame Impala como líderes del neo-psicodelia, influyendo en la música alternativa a nivel mundial.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 2013
      tituloDelContenidoEspecifico = "Música 2013: Bandas Destacadas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "**Banda Mexicana Influyente 2013:**\n" +
        "- **The Chamanas** (Ciudad Juárez)\n" +
        "  - Álbum: Once Once\n" +
        "  - Canción clave: \"Dulce Mal\"\n" +
        "  - Impacto: Su combinación de indie pop con folklore tradicional y sonidos fronterizos creó una conexión musical entre México y Estados Unidos, representando la cultura de la frontera.\n\n" +
        "**Banda Internacional Influyente 2013:**\n" +
        "- **Daft Punk** (Francia)\n" +
        "  - Álbum: Random Access Memories\n" +
        "  - Canción clave: \"Get Lucky\"\n" +
        "  - Impacto: El dúo francés revitalizó la música disco y electrónica, colaborando con artistas de renombre y ganando múltiples premios Grammy.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 2014
      tituloDelContenidoEspecifico = "Música 2014: Bandas Destacadas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "**Banda Mexicana Influyente 2014:**\n" +
        "- **La Bande-Son Imaginaire** (Oaxaca)\n" +
        "  - Álbum: El Horror Jazz\n" +
        "  - Canción clave: \"Macabre\"\n" +
        "  - Impacto: Este proyecto de darkwave y postpunk fusionó elementos de la cultura mexicana indígena con poesía francesa y teatro, destacando por su propuesta multidisciplinaria y estética cinematográfica.\n\n" +
        "**Banda Internacional Influyente 2014:**\n" +
        "- **Royal Blood** (Reino Unido)\n" +
        "  - Álbum: Royal Blood\n" +
        "  - Canción clave: \"Out of the Black\"\n" +
        "  - Impacto: Con su sonido crudo y potente, el dúo británico revitalizó el garage rock, siendo considerados \"los salvadores del rock\" por algunos críticos.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 2015
      tituloDelContenidoEspecifico = "Música 2015: Bandas Destacadas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "**Banda Mexicana Influyente 2015:**\n" +
        "- **Los Cogelones** (Nezahualcóyotl)\n" +
        "  - Álbum: Hijos del Sol\n" +
        "  - Canción clave: \"Tonantzin\"\n" +
        "  - Impacto: Integrando elementos de la cultura Mexica con punk y rock experimental, esta banda familiar se convirtió en una sensación en México, rescatando raíces ancestrales a través de su música.\n\n" +
        "**Banda Internacional Influyente 2015:**\n" +
        "- **Twenty One Pilots** (Estados Unidos)\n" +
        "  - Álbum: Blurryface\n" +
        "  - Canción clave: \"Stressed Out\"\n" +
        "  - Impacto: Fusionando hip-hop, rock y pop, la banda abordó temas de ansiedad y juventud, conectando profundamente con audiencias jóvenes.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 2016
      tituloDelContenidoEspecifico = "Música 2016: Bandas Destacadas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "**Banda Mexicana Influyente 2016:**\n" +
        "- **Joliette** (Puebla)\n" +
        "  - Álbum: Atáxico\n" +
        "  - Canción clave: \"Están Felices\"\n" +
        "  - Impacto: Con su sonido complejo que combina post-hardcore, punk rock y mathcore, Joliette ofreció una propuesta enérgica y moderna en la escena hardcore mexicana.\n\n" +
        "**Banda Internacional Influyente 2016:**\n" +
        "- **The 1975** (Reino Unido)\n" +
        "  - Álbum: I Like It When You Sleep, for You Are So Beautiful yet So Unaware of It\n" +
        "  - Canción clave: \"Love Me\"\n" +
        "  - Impacto: Con una mezcla de pop, rock y electrónica, The 1975 exploró temas de amor y sociedad, ganando reconocimiento internacional.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 8") { // Año 2017
      tituloDelContenidoEspecifico = "Música 2017: Bandas Destacadas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "**Banda Mexicana Influyente 2017:**\n" +
        "- **Ampersan** (Guadalajara)\n" +
        "  - Álbum: Autorreverse\n" +
        "  - Canción clave: \"Flor de Maíz\"\n" +
        "  - Impacto: Fusionando música de raíz tradicional con sonidos electrónicos y psicodelia, Ampersan ofreció una visión contemporánea de la música tradicional mexicana.\n\n" +
        "**Banda Internacional Influyente 2017:**\n" +
        "- **Fever 333** (Estados Unidos)\n" +
        "  - Álbum: Made an America\n" +
        "  - Canción clave: \"Walking in My Shoes\"\n" +
        "  - Impacto: Reviviendo el rap-metal, la banda se convirtió en una sensación en los circuitos de metal mundial, abordando temas de justicia social.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 9") { // Año 2018
      tituloDelContenidoEspecifico = "Música 2018: Bandas Destacadas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "**Banda Mexicana Influyente 2018:**\n" +
        "- **Clubz** (Monterrey)\n" +
        "  - Álbum: Destellos\n" +
        "  - Canción clave: \"El Rollo\"\n" +
        "  - Impacto: Este dúo electrónico mezcló ritmos de los 80 y 90 con pop moderno, destacando por su estilo bailable y líricas interesantes.\n\n" +
        "**Banda Internacional Influyente 2018:**\n" +
        "- **Greta Van Fleet** (Estados Unidos)\n" +
        "  - Álbum: Anthem of the Peaceful Army\n" +
        "  - Canción clave: \"When the Curtain Falls\"\n" +
        "  - Impacto: Con un sonido reminiscentes de Led Zeppelin, la banda trajo el rock clásico a nuevas generaciones.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 10") { // Año 2019 y más Tendencias
      tituloDelContenidoEspecifico = "Música 2019: Bandas Destacadas y Evolución de Géneros";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "**Más Tendencias de la Década (2010-2025):**\n" +
        "La música regional mexicana, particularmente los corridos tumbados, con artistas como Peso Pluma y Grupo Frontera encabezando las listas de éxitos internacionales. La cumbia experimentó un resurgimiento, a menudo con giros modernos y colaboraciones con artistas pop. El pop latino y urbano continuaron prosperando, con artistas establecidos y nuevos empujando los límites. La música tejana experimentó un resurgimiento en popularidad.\n\n" +
        "**Banda Mexicana Influyente 2019:**\n" +
        "- **Sonic Emerson** (Tijuana)\n" +
        "  - Álbum: Si tan solo supiera por qué estoy aquí\n" +
        "  - Canción clave: \"Luz de Día\"\n" +
        "  - Impacto: Con un espíritu lo-fi y psicodelia setentera, Sebastián Neyra llevó a los oyentes por caminos coloridos con guitarras distorsionadas y riffs que cuentan historias.\n\n" +
        "**Banda Internacional Influyente 2019:**\n" +
        "- **Jinjer** (Ucrania)\n" +
        "  - Álbum: Macro\n" +
        "  - Canción clave: \"Judgement (& Punishment)\"\n" +
        "  - Impacto: Con su mezcla de metalcore y groove, Jinjer ganó reconocimiento internacional, destacando por la potente voz de su vocalista.";
      contenidoDefinido = true;
    }
  }
  // SUBTEMA: Contexto México
  else if (NOMBRES_SUB_BOTONES[j] === "Contexto México") {
    if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 2010
      tituloDelContenidoEspecifico = "Contexto México 2010: Elecciones y Desafíos";
      urlDelVideoEspecifico = "assets/musica6.mp4";
      descripcionDelContenidoEspecifico =
        "Se llevaron a cabo elecciones en 14 estados para elegir gobernadores y otros cargos locales. El Partido Revolucionario Institucional (PRI) obtuvo importantes victorias, consolidando su presencia en varias entidades federativas.\n\n" +
        "El 10 de agosto, la Suprema Corte de Justicia de la Nación dictaminó que los matrimonios entre personas del mismo sexo realizados en la Ciudad de México debían ser reconocidos en todo el país, marcando un avance significativo en los derechos LGBT+.\n\n" +
        "México participó en los primeros Juegos Olímpicos de la Juventud celebrados en Singapur, obteniendo varias medallas en disciplinas como taekwondo y atletismo.\n\n" +
        "La lucha contra el narcotráfico continuó siendo un tema central. La violencia relacionada con el crimen organizado resultó en miles de muertes, incluyendo la de Rodolfo Torre Cantú, candidato a gobernador de Tamaulipas, asesinado el 28 de junio.\n\n" +
        "El primer huracán de la temporada atlántica de 2010 tocó tierra en Tamaulipas como categoría 2, causando inundaciones severas en el noreste del país. En Nuevo León, especialmente en Monterrey, se reportaron daños considerables en infraestructura.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 2011
      tituloDelContenidoEspecifico = "Contexto México 2011: Elecciones Edomex y Protestas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "En julio, el Partido Revolucionario Institucional (PRI) obtuvo una victoria significativa en las elecciones del Estado de México, con Eruviel Ávila como gobernador electo. Esta victoria fortaleció la posición del PRI de cara a las elecciones presidenciales de 2012.\n\n" +
        "Miles de personas participaron en protestas a nivel nacional contra la violencia relacionada con el narcotráfico, convocadas por el poeta Javier Sicilia, cuyo hijo fue asesinado en marzo de 2011.\n\n" +
        "En junio, el volcán Popocatépetl emitió una columna de ceniza de 3 km de altura, llevando a las autoridades a establecer una zona de exclusión.\n\n" +
        "La selección mexicana de fútbol participó en la Copa América 2011 con un equipo sub-22, siendo eliminada en la fase de grupos.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 2012
      tituloDelContenidoEspecifico = "Contexto México 2012: Regreso del PRI a la Presidencia";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Enrique Peña Nieto del PRI fue elegido presidente, marcando el regreso del PRI al poder después de dos mandatos de presidentes del PAN. Esto señaló un posible cambio en las prioridades políticas y los enfoques de política.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 2013
      tituloDelContenidoEspecifico = "Contexto México 2013: Reformas Estructurales";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Durante la administración de Peña Nieto se implementaron reformas estructurales, incluyendo reformas energética y financiera. Estas reformas tenían como objetivo modernizar la economía mexicana, pero también enfrentaron críticas por sus posibles impactos sociales y ambientales.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 2014
      tituloDelContenidoEspecifico = "Contexto México 2014: El Caso Ayotzinapa";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "El caso Ayotzinapa, la desaparición de 43 estudiantes, se convirtió en un evento trascendental. Esta tragedia desató una indignación y protestas generalizadas, poniendo de manifiesto problemas de corrupción, impunidad y la gestión de la crisis por parte del gobierno.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 2015
      tituloDelContenidoEspecifico = "Contexto México 2015: Fuga de 'El Chapo' y Crisis";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "El 11 de julio, Joaquín \"El Chapo\" Guzmán, líder del Cártel de Sinaloa, escapó por segunda vez de una prisión de máxima seguridad en México. Utilizó un túnel de 1.5 km excavado desde su celda en el penal del Altiplano. Este evento generó una crisis política y cuestionamientos sobre la corrupción en el sistema penitenciario.\n\n" +
        "En septiembre, el Grupo Interdisciplinario de Expertos Independientes (GIEI) presentó un informe que cuestionaba la \"verdad histórica\" del gobierno sobre la desaparición de los 43 estudiantes de Ayotzinapa, señalando inconsistencias y posibles obstrucciones en la investigación oficial.\n\n" +
        "La empresa constructora OHL México estuvo en el centro de la controversia por filtraciones de llamadas telefónicas que sugerían actos de corrupción y tráfico de influencias en contratos de infraestructura, involucrando a funcionarios de alto nivel.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 2016
      tituloDelContenidoEspecifico = "Contexto México 2016: Visita de Trump y CDMX";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "En agosto, el entonces candidato presidencial estadounidense Donald Trump visitó México y se reunió con el presidente Enrique Peña Nieto. La visita generó una fuerte controversia debido a las declaraciones previas de Trump sobre los mexicanos y su propuesta de construir un muro fronterizo.\n\n" +
        "El 20 de enero, se promulgó una reforma que transformó al Distrito Federal en la Ciudad de México (CDMX), otorgándole mayor autonomía y una constitución propia.\n\n" +
        "La economía mexicana creció un 2.1%, impulsada principalmente por el consumo interno y las remesas. Sin embargo, factores como la caída en los precios del petróleo y la incertidumbre externa afectaron el crecimiento. El Banco de México incrementó la tasa de interés de referencia en varias ocasiones. El gobierno continuó implementando reformas en sectores clave. Un informe de la OCDE destacó avances y desafíos en salud. México obtuvo cinco medallas en los Juegos Olímpicos de Río de Janeiro.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 8") { // Año 2017
      tituloDelContenidoEspecifico = "Contexto México 2017: Terremotos";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "México fue afectado por varios terremotos. Al igual que en 1985, estos desastres naturales pusieron a prueba la resiliencia de la sociedad mexicana y la efectividad de los mecanismos de respuesta ante desastres.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 9") { // Año 2018
      tituloDelContenidoEspecifico = "Contexto México 2018: Elección de AMLO";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Andrés Manuel López Obrador (AMLO) fue elegido presidente, prometiendo un cambio radical en la política mexicana. Su victoria reflejó un descontento generalizado con el anterior establishment político y un deseo de cambios sociales y económicos significativos.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 10") { // Año 2019
      tituloDelContenidoEspecifico = "Contexto México 2019: Transición y Primer Año de Gobierno";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "El año 2019 marcó el primer año completo de la administración de Andrés Manuel López Obrador. Se caracterizó por el inicio de nuevas políticas sociales, cambios en la estrategia de seguridad y un enfoque en la austeridad gubernamental. (Información específica para 2019 pendiente de agregarse).";
      contenidoDefinido = true;
    }
  }
  // SUBTEMA: Moda
  else if (NOMBRES_SUB_BOTONES[j] === "Moda") {
    if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 2010
      tituloDelContenidoEspecifico = "Moda 2010: Inicio de Década - Hipster, Neón y 90s";
      urlDelVideoEspecifico = "assets/musica5.mp4";
      descripcionDelContenidoEspecifico =
        "Al inicio de la década de 2010, se observó la influencia de la moda _hipster_, caracterizada por un estilo retro y ecléctico.\n" +
        "Paralelamente, los colores neón irrumpieron como una tendencia vibrante y llamativa a nivel internacional, encontrando eco en México.\n" +
        "También comenzó a hacerse evidente un resurgimiento de estilos de la década de 1990, con la reaparición de prendas y accesorios icónicos de esa época.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 2011
      tituloDelContenidoEspecifico = "Moda 2011: Asentamiento de Tendencias Iniciales";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Las tendencias de principios de la década continuaron su desarrollo. El estilo _hipster_ siguió popularizándose, fomentando la individualidad y el gusto por lo vintage.\n" +
        "El resurgimiento de la moda de los 90 se hizo más notorio, con elementos como los _crop tops_, _mom jeans_ y zapatillas deportivas robustas volviendo a las calles.\n" +
        "Los colores neón seguían presentes, aunque quizás empezando a combinarse de formas más sofisticadas o como acentos en los atuendos.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 2012
      tituloDelContenidoEspecifico = "Moda 2012: El Fenómeno 'Athleisure'";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "El fenómeno global del \"_athleisure_\", que combinaba la ropa deportiva con la vestimenta cotidiana, también se adoptó con fuerza en el estilo urbano mexicano.\n" +
        "Esta tendencia reflejó una búsqueda creciente hacia la comodidad y la practicidad sin sacrificar el estilo, integrando _sneakers_, _leggings_ y sudaderas en looks de diario.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 2013
      tituloDelContenidoEspecifico = "Moda 2013: Emergencia de Diseñadores Mexicanos";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Esta época vio el surgimiento y consolidación de diseñadores mexicanos que comenzaron a ganar reconocimiento tanto a nivel nacional como internacional.\n" +
        "Figuras como Lorena Saravia y Kris Goyri destacaron por sus propuestas innovadoras y su capacidad para fusionar elementos de la cultura mexicana con tendencias contemporáneas, aportando frescura al panorama de la moda nacional.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 2014
      tituloDelContenidoEspecifico = "Moda 2014: Influencias Globales y Redes Sociales";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "A mediados de la década de 2010, la influencia de las tendencias globales continuó, pero con un posible mayor énfasis en la expresión individual y los estilos únicos.\n" +
        "Las redes sociales comenzaron a consolidar su papel como plataformas clave para la difusión de tendencias de moda dentro de México, con los primeros _influencers_ marcando pauta.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 2015
      tituloDelContenidoEspecifico = "Moda 2015: Auge de Influencers y Estilos Únicos";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Las redes sociales se consolidaron como plataformas clave para la difusión de tendencias de moda dentro de México.\n" +
        "Los _influencers_ comenzaron a marcar pauta de manera significativa, dictando estilos y promoviendo marcas entre sus seguidores, lo que democratizó y a la vez diversificó las fuentes de inspiración en moda.\n" +
        "Se observó un mayor énfasis en la expresión individual y los estilos únicos.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 2016
      tituloDelContenidoEspecifico = "Moda 2016: Diseñadores Mexicanos en Foco";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Diseñadores y marcas mexicanas jugaron un papel fundamental en la configuración del panorama de la moda.\n" +
        "- **Carla Fernández** destacó por su enfoque en la sostenibilidad y la colaboración con artesanos indígenas, fusionando técnicas tradicionales con diseños contemporáneos.\n" +
        "- **Lorena Saravia** se consolidó por sus líneas limpias y su elegancia moderna, ofreciendo prendas versátiles y sofisticadas.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 8") { // Año 2017
      tituloDelContenidoEspecifico = "Moda 2017: Innovación y Propuestas Mexicanas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Continuó el reconocimiento de talentos mexicanos en la moda:\n" +
        "- **Kris Goyri** fue reconocido por sus siluetas femeninas y el uso de colores vibrantes, creando piezas con un fuerte impacto visual.\n" +
        "- Otros diseñadores como **Bárbara Sánchez-Kane** y **Yakampot** también contribuyeron con propuestas innovadoras que reflejaban tanto la herencia cultural mexicana como las tendencias globales.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 9") { // Año 2018
      tituloDelContenidoEspecifico = "Moda 2018: Estilo Urbano en las Metrópolis Mexicanas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "El estilo urbano en las principales ciudades de México, particularmente en la Ciudad de México, ofreció una visión directa de las tendencias emergentes y la forma en que los individuos adaptaron la moda a su vida cotidiana.\n" +
        "Se observó una mezcla de influencias globales y locales, con la adopción de tendencias internacionales como el _athleisure_ y el resurgimiento de la moda de los 90, combinadas con elementos propios de la cultura mexicana.\n" +
        "La Ciudad de México se convirtió en un crisol de estilos, donde la creatividad individual y la expresión personal fueron elementos clave del _street style_.";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 10") { // Año 2019
      tituloDelContenidoEspecifico = "Moda 2019: Sostenibilidad, Ética y E-commerce";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Hacia finales de la década de 2010, se observó una mayor evolución de las tendencias establecidas y la aparición de nuevos enfoques.\n" +
        "Un factor cada vez más importante fue el enfoque en la sostenibilidad y la moda ética, que posiblemente se reflejó en las decisiones de los consumidores y diseñadores mexicanos.\n" +
        "El comercio electrónico también desempeñó un papel creciente al hacer que una variedad más amplia de moda fuera accesible en todo el país, transformando la manera de consumir y descubrir nuevas propuestas.";
      contenidoDefinido = true;
    }
  }
}
// --- FIN DEL BLOQUE PARA ÉPOCA 2010 ---
// --- FIN DEL BLOQUE PARA ÉPOCA 2010 -----
        // --- COPIA Y PEGA ESTE BLOQUE COMPLETO PARA LA ÉPOCA 2025 ---
// Asegúrate de que este bloque "else if" para la Época 2025 esté después del bloque de la Época 2010
// y antes de la lógica de contenido por defecto en tu función setup().
// --- COPIA Y PEGA ESTE BLOQUE COMPLETO PARA REEMPLAZAR/AÑADIR TU BLOQUE PARA "ÉPOCA 2025" ---
// --- COPIA Y PEGA ESTE BLOQUE COMPLETO PARA REEMPLAZAR/AÑADIR TU BLOQUE PARA "ÉPOCA 2025" ---
// --- COPIA Y PEGA ESTE BLOQUE COMPLETO PARA REEMPLAZAR/AÑADIR TU BLOQUE PARA "ÉPOCA 2025" ---
// --- COPIA Y PEGA ESTE BLOQUE COMPLETO PARA REEMPLAZAR/AÑADIR TU BLOQUE PARA "ÉPOCA 2025" ---
else if (textosBotonesEpocas[i] === "2025") {
  // SUBTEMA: Contexto del Chopo
  if (NOMBRES_SUB_BOTONES[j] === "Contexto del Chopo") {
    if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 2020
      tituloDelContenidoEspecifico = "Chopo 2020: Impacto de la Pandemia";
      urlDelVideoEspecifico = "assets/con chopo 5.mp4";
      descripcionDelContenidoEspecifico =
        "El Tianguis Cultural del Chopo se ve obligado a suspender sus actividades debido a la pandemia de COVID-19.\n\n" +
        "Posteriormente, reabre implementando protocolos sanitarios para proteger a vendedores y visitantes."; // Fuente: 2020.md (Chopo)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 2021
      tituloDelContenidoEspecifico = "Chopo 2021: Defensa del Espacio Autónomo";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Se denuncian invasiones de comerciantes ajenos al espíritu y acuerdos del Tianguis.\n\n" +
        "La comunidad del Chopo se moviliza para defenderlo como un espacio cultural autónomo y autogestionado."; // Fuente: 2021.md (Chopo)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 2022
      tituloDelContenidoEspecifico = "Chopo 2022: Campaña por el Patrimonio Cultural";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Se lanza una campaña digital y se realizan diversas actividades para impulsar el reconocimiento del Tianguis Cultural del Chopo como patrimonio cultural."; // Fuente: 2022.md (Chopo)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 2023
      tituloDelContenidoEspecifico = "Chopo 2023: Declaratoria como Patrimonio Cultural";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "En septiembre, el Tianguis Cultural del Chopo es declarado Patrimonio Cultural Inmaterial de la Ciudad de México.\n\n" +
        "Una comisión del Tianguis se reúne con el jefe de gobierno de la Ciudad de México, Martí Batres, para discutir los detalles y alcances de esta declaratoria."; // Fuente: 2023.md (Chopo)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 2024
      tituloDelContenidoEspecifico = "Chopo 2024: Aniversario, Legado y Noche de Museos";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Se documenta la historia y legado del Tianguis en formato documental.\n" +
        "El Tianguis celebra su 44 aniversario, reafirmando su papel como un espacio para la música, la reunión y la libertad.\n" +
        "Por primera vez en su historia, el Tianguis Cultural del Chopo realiza actividades entre semana como parte de la Noche de Museos.\n" +
        "Se inaugura simbólicamente el mural \"Guerreros en la Guerrero\" del artista Yeser Cruz, que busca representar la historia del Tianguis.\n" +
        "Se publica el artículo \"Crónicas del Chopo 2024\" por Black Merch Magazine.\n" +
        "El Tianguis continúa operando semanalmente los sábados, recibiendo entre 5,000 y 10,000 visitantes, y sigue siendo un espacio donde convergen la música alternativa, el arte independiente y diversas expresiones contraculturales."; // Fuente: 2024.md (Chopo)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 2025
      tituloDelContenidoEspecifico = "Chopo 2025: 45 Años de Contracultura";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Se planea la celebración de los 45 años del Tianguis Cultural del Chopo con un festival de culturas urbanas.\n\n" +
        "Continúa siendo un emblemático lugar de la contracultura en la Ciudad de México, manteniendo su espíritu y actividades características."; // Fuente: 2025.md (Chopo)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 7") {
      tituloDelContenidoEspecifico = "Chopo 2025 - Parte 7: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información para Época 2025, Subtema Contexto del Chopo, Parte 7. (Contenido de ejemplo).";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 8") {
      tituloDelContenidoEspecifico = "Chopo 2025 - Parte 8: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información para Época 2025, Subtema Contexto del Chopo, Parte 8. (Contenido de ejemplo).";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 9") {
      tituloDelContenidoEspecifico = "Chopo 2025 - Parte 9: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información para Época 2025, Subtema Contexto del Chopo, Parte 9. (Contenido de ejemplo).";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 10") {
      tituloDelContenidoEspecifico = "Chopo 2025 - Parte 10: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información para Época 2025, Subtema Contexto del Chopo, Parte 10. (Contenido de ejemplo).";
      contenidoDefinido = true;
    }
  }
  // SUBTEMA: Arte
  else if (NOMBRES_SUB_BOTONES[j] === "Arte") {
    if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 2020
      tituloDelContenidoEspecifico = "Arte en 2020: Bienal Tamayo y Disrupción Pandémica";
      urlDelVideoEspecifico = "assets/musica3.mp4";
      descripcionDelContenidoEspecifico =
        "Eventos artísticos destacados en 2020:\n\n" +
        "- **Bienal Tamayo:** Se celebró la XVIII Bienal de Pintura Rufino Tamayo en el Museo Tamayo.\n" +
        "- **Pandemia COVID-19:** Marcó el inicio de importantes disrupciones en todo el sector cultural, afectando exposiciones, museos y la actividad artística en general."; // Fuentes: 2020.md (Arte)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 2021
      tituloDelContenidoEspecifico = "Arte en 2021: Material en Guadalajara y Exposiciones en San Ildefonso";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Eventos artísticos destacados en 2021:\n\n" +
        "- **Estación Material Vol. 1:** Se llevó a cabo en octubre en Guadalajara, expandiendo la presencia de la feria de arte.\n" +
        "- **San Ildefonso:** El Antiguo Colegio de San Ildefonso presentó exposiciones de Francisco Toledo y Rozana Montiel."; // Fuentes: 2021.md (Arte)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 2022
      tituloDelContenidoEspecifico = "Arte en 2022: Bienal Tamayo, Julio Galán y Material Art Fair";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Eventos artísticos destacados en 2022:\n\n" +
        "- **Bienal Tamayo:** Se celebró la XIX Bienal de Pintura Rufino Tamayo en el Museo Tamayo.\n" +
        "- **Julio Galán:** El Museo Tamayo acogió una importante exposición retrospectiva del artista Julio Galán.\n" +
        "- **Material Art Fair Vol. 8:** Tuvo lugar en abril/mayo en Sabino 369."; // Fuentes: 2022.md (Arte)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 2023
      tituloDelContenidoEspecifico = "Arte en 2023: Material Art Fair y Aniversario de ZONA MACO";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Eventos artísticos destacados en 2023:\n\n" +
        "- **Material Art Fair Vol. 9:** Se realizó en febrero en Expo Reforma.\n" +
        "- **ZONA MACO:** Celebró su 20º Aniversario en febrero en el Centro Citibanamex."; // Fuentes: 2023.md (Arte)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 2024
      tituloDelContenidoEspecifico = "Arte en 2024: Ferias, Bienales y Exposiciones Relevantes";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Eventos artísticos destacados en 2024:\n\n" +
        "- **Material Art Fair Vol. 10:** Edición de febrero en Expo Reforma.\n" +
        "- **ZONA MACO:** Edición anual en febrero en el Centro Citibanamex.\n" +
        "- **Bienal FEMSA:** Exposición de revisión por sus 30 años en el Museo de Arte e Historia de Guanajuato.\n" +
        "- **MAM (Museo de Arte Moderno):** Presentó exposiciones de M. Álvarez Bravo, \"En Pugna\", \"Todo había estado muy normal...\", y \"Presencia infinita\".\n" +
        "- **MUAC (Museo Universitario Arte Contemporáneo):** Exhibió muestras de Julieta Aranda y \"Otras cartografías\".\n" +
        "- **Museo del Chopo:** Presentó la exposición \"El fin de lo maravilloso I Cyberpop en México\".\n" +
        "- **ArteVivo:** Edición anual de la subasta/evento.\n" +
        "- **Salón ACME:** Edición No. 11 en febrero."; // Fuentes: 2024.md (Arte)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 2025
      tituloDelContenidoEspecifico = "Arte en 2025: Prospectiva y Continuidad (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Para el año 2025, se espera la continuación de importantes ferias de arte como ZONA MACO y Material Art Fair, así como una rica programación en museos y galerías.\n\n" +
        "Las tendencias observadas en años anteriores, como el enfoque en el arte contemporáneo mexicano y latinoamericano, la exploración de nuevas tecnologías y las temáticas sociales y de identidad, probablemente seguirán siendo relevantes.\n" +
        "(Información específica para eventos de arte en 2025 pendiente de agregarse).";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 7") {
      tituloDelContenidoEspecifico = "Arte 2025 - Parte 7: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información para Época 2025, Subtema Arte, Parte 7. (Contenido de ejemplo).";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 8") {
      tituloDelContenidoEspecifico = "Arte 2025 - Parte 8: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información para Época 2025, Subtema Arte, Parte 8. (Contenido de ejemplo).";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 9") {
      tituloDelContenidoEspecifico = "Arte 2025 - Parte 9: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información para Época 2025, Subtema Arte, Parte 9. (Contenido de ejemplo).";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 10") {
      tituloDelContenidoEspecifico = "Arte 2025 - Parte 10: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información para Época 2025, Subtema Arte, Parte 10. (Contenido de ejemplo).";
      contenidoDefinido = true;
    }
  }
  // SUBTEMA: Cine
  else if (NOMBRES_SUB_BOTONES[j] === "Cine") {
    if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 2019
      tituloDelContenidoEspecifico = "Cine 2019: 'Roma' y Nuevas Óperas Primas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "'Roma' arrasa en los Arieles y los Oscar. Los Premios Ariel (LXI edición, para películas de 2018) otorgaron 10 premios a 'Roma', incluyendo Mejor Película y Mejor Director para Alfonso Cuarón. 'La camarista' de Lila Avilés ganó Ópera Prima.\n\n" +
        "**Películas Destacadas de 2019:**\n" +
        "- Roma (Dir. Alfonso Cuarón)\n" +
        "- La camarista (Ópera Prima, Dir. Lila Avilés)\n" +
        "- Las niñas bien (Dir. Alejandra Márquez Abella)\n" +
        "- Museo (Dir. Alonso Ruizpalacios)\n" +
        "- Nuestro tiempo (Dir. Carlos Reygadas)\n" +
        "- Hasta los dientes (Documental, Ópera Prima, Dir. Alberto Arnaut)\n" +
        "- Ocho de cada diez (Dir. Sergio Umansky Brener)\n" +
        "- De la infancia (Dir. Carlos Carrera)\n" +
        "- Ana y Bruno (Animación, Dir. Carlos Carrera)\n" +
        "- Ya no estoy aquí (Ópera Prima, Dir. Fernando Frías de la Parra)"; // Fuente: 2019.md (Cine)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 2020
      tituloDelContenidoEspecifico = "Cine 2020: Pandemia, FOCINE y 'Ya no estoy aquí'";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "El inicio de esta etapa estuvo marcado indeleblemente por la pandemia de COVID-19, que paralizó la industria. La producción mexicana se redujo casi a la mitad ese año y las salas de cine sufrieron cierres prolongados.\n" +
        "En 2020, el gobierno mexicano eliminó los fideicomisos FOPROCINE y FIDECINE, generando controversia.\n\n" +
        "Los Premios Ariel (LXII edición, para películas de 2019) galardonaron a 'Ya no estoy aquí' de Fernando Frías de la Parra con 10 premios, incluyendo Mejor Película y Mejor Director. 'Mano de obra' de David Zonana ganó Ópera Prima.\n\n" +
        "**Películas Destacadas de 2020:**\n" +
        "- Ya no estoy aquí (Dir. Fernando Frías de la Parra)\n" +
        "- Mano de obra (Ópera Prima, Dir. David Zonana)\n" +
        "- Asfixia (Dir. Kenya Márquez)\n" +
        "- Sonora (Dir. Alejandro Springall)\n" +
        "- Esto no es Berlín (Dir. Hari Sama)\n" +
        "- Polvo (Ópera Prima, Dir. José María Yázpik)\n" +
        "- Cómprame un revólver (Dir. Julio Hernández Cordón)\n" +
        "- Belzebuth (Dir. Emilio Portes)\n" +
        "- El guardián de la memoria (Documental, Dir. Marcela Arteaga)\n" +
        "- Sin señas particulares (Ópera Prima, Dir. Fernanda Valadez)"; // Fuente: 2020.md (Cine)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 2021
      tituloDelContenidoEspecifico = "Cine 2021: Recuperación, FOCINE y 'Sin señas particulares'";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "La industria comienza a recuperarse. En 2021, IMCINE implementó el Programa de Fomento al Cine Mexicano (FOCINE), un nuevo esquema basado en apoyos directos con enfoque en descentralización y diversidad.\n" +
        "Los Premios Ariel (LXIII edición, para películas de 2020) reconocieron a 'Sin señas particulares' de Fernanda Valadez como Mejor Película, Mejor Ópera Prima y Mejor Dirección. 'El baile de los 41' de David Pablos también obtuvo múltiples premios.\n\n" +
        "**Películas Destacadas de 2021:**\n" +
        "- Sin señas particulares (Dir. Fernanda Valadez)\n" +
        "- El baile de los 41 (Dir. David Pablos)\n" +
        "- Los lobos (Dir. Samuel Kishi Leopo)\n" +
        "- Selva trágica (Dir. Yulene Olaizola)\n" +
        "- Las tres muertes de Marisela Escobedo (Documental, Dir. Carlos Pérez Osorio)\n" +
        "- Nuevo orden (Dir. Michel Franco)\n" +
        "- Un disfraz para Nicolás (Animación, Dir. Eduardo Rivero)\n" +
        "- Te llevo conmigo (Dir. Heidi Ewing)\n" +
        "- Nudo mixteco (Ópera Prima, Dir. Ángeles Cruz)\n" +
        "- Una película de policías (Documental, Dir. Alonso Ruizpalacios)"; // Fuente: 2021.md (Cine)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 2022
      tituloDelContenidoEspecifico = "Cine 2022: Estabilización y 'Noche de Fuego'";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "La producción se estabiliza cerca de niveles prepandemia. Se registraron 258 largometrajes.\n" +
        "Los Premios Ariel (LXIV edición, para películas de 2021) otorgaron el premio a Mejor Película a 'Noche de fuego' de Tatiana Huezo. Alonso Ruizpalacios ganó como Mejor Director por 'Una película de policías'. 'Nudo mixteco' de Ángeles Cruz ganó Ópera Prima.\n\n" +
        "**Películas Destacadas de 2022:**\n" +
        "- Noche de fuego (Dir. Tatiana Huezo)\n" +
        "- Una película de policías (Documental, Dir. Alonso Ruizpalacios)\n" +
        "- Nudo mixteco (Dir. Ángeles Cruz)\n" +
        "- Cosas imposibles (Dir. Ernesto Contreras)\n" +
        "- El otro Tom (Dir. Rodrigo Plá, Laura Santullo)\n" +
        "- Los minutos negros (Dir. Mario Muñoz)\n" +
        "- El diablo entre las piernas (Dir. Arturo Ripstein)\n" +
        "- El hoyo en la cerca (Dir. Joaquín del Paso)\n" +
        "- Bardo, falsa crónica de unas cuantas verdades (Dir. Alejandro G. Iñárritu)\n" +
        "- El norte sobre el vacío (Dir. Alejandra Márquez Abella)"; // Fuente: 2022.md (Cine)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 2023
      tituloDelContenidoEspecifico = "Cine 2023: 'El Norte Sobre el Vacío' y Producción Continua";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "La producción se mantuvo robusta con 234 largometrajes.\n" +
        "Los Premios Ariel (LXV edición, para películas de 2022) reconocieron a 'El norte sobre el vacío' de Alejandra Márquez Abella como Mejor Película. Alejandro G. Iñárritu ganó como Mejor Director por 'Bardo'. 'Huesera' de Michelle Garza Cervera ganó Ópera Prima.\n\n" +
        "**Películas Destacadas de 2023:**\n" +
        "- El norte sobre el vacío (Dir. Alejandra Márquez Abella)\n" +
        "- Bardo, falsa crónica de unas cuantas verdades (Dir. Alejandro G. Iñárritu)\n" +
        "- Huesera (Ópera Prima, Dir. Michelle Garza Cervera)\n" +
        "- La civil (Dir. Teodora Mihai)\n" +
        "- La caída (Dir. Lucía Puenzo)\n" +
        "- Ruido (Dir. Natalia Beristáin)\n" +
        "- Zapatos rojos (Ópera Prima, Dir. Carlos Eichelmann Kaiser)\n" +
        "- Tótem (Ópera Prima, Dir. Lila Avilés)\n" +
        "- El Eco (Documental, Dir. Tatiana Huezo)\n" +
        "- Home Is Somewhere Else (Animación Documental, Dir. Carlos Hagerman, Jorge Villalobos)"; // Fuente: 2023.md (Cine)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 2024
      tituloDelContenidoEspecifico = "Cine 2024: 'Tótem' y Continuidad";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "El año aún está en curso, pero ya se perfilan películas importantes. Los Premios Ariel (LXVI edición, para películas de 2023) galardonaron a 'Tótem' de Lila Avilés como Mejor Película y Mejor Dirección. 'Todo el silencio' de Diego del Río ganó Ópera Prima.\n\n" +
        "**Películas Destacadas de 2024 (o presentadas para Arieles 2024):**\n" +
        "- Tótem (Dir. Lila Avilés)\n" +
        "- El Eco (Documental, Dir. Tatiana Huezo)\n" +
        "- Heroico (Dir. David Zonana)\n" +
        "- Temporada de huracanes (Dir. Elisa Miller)\n" +
        "- Todo el silencio (Ópera Prima, Dir. Diego del Río)\n" +
        "- Desaparecer por completo (Dir. Luis Javier Henaine)\n" +
        "- Kokoloko (Dir. Gerardo Naranjo)\n" +
        "- Familia (Dir. Rodrigo García)\n" +
        "- Perdidos en la noche (Dir. Amat Escalante)\n" +
        "- Pedro Páramo (Próximo estreno, Dir. Rodrigo Prieto)"; // Fuente: 2024.md (Cine)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 2025 - Conclusión y Perspectivas
      tituloDelContenidoEspecifico = "Cine Mexicano (1980-2024): Trayectoria y Futuro";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "**Conclusión de la Trayectoria 1980-2024:**\n" +
        "El cine mexicano ha recorrido un camino complejo y dinámico, marcado por la resiliencia frente a adversidades económicas y políticas significativas. La industria transitó desde una profunda crisis en los ochenta, hacia una renovación impulsada por el \"Nuevo Cine Mexicano\" en los noventa.\n" +
        "La década de 2000 vio la consolidación de figuras en el panorama mundial, mientras que a nivel nacional, estímulos como EFICINE y la diversificación de géneros contribuyeron a una recuperación sostenida de la producción. La década de 2010 confirmó esta tendencia, alcanzando cifras récord de producción y viendo éxitos masivos de taquilla para ciertos géneros.\n" +
        "El periodo 2020-2024, impactado por la pandemia, aceleró la digitalización y reestructuró las políticas de fomento con FOCINE. La producción ha mostrado capacidad de recuperación , pero la industria enfrenta el reto de adaptarse al dominio creciente de las plataformas de streaming.\n" +
        "El Tianguis del Chopo, con su reciente reconocimiento como Patrimonio Cultural Inmaterial, mantiene una relación simbólica con la cultura alternativa y el cine.\n\n" +
        "**Desafíos y Panorama (hacia 2025):**\n" +
        "El futuro del cine mexicano radica en consolidar un ecosistema sostenible que garantice producción diversa y acceso equitativo del público a la pluralidad de historias que México tiene para contar, tanto en las pantallas comerciales como en las plataformas digitales y los espacios alternativos que, como El Chopo, siguen nutriendo la identidad cultural nacional."; // Fuente: Conclusión de 2024.md (Cine) y Panorama de 2020.md (Cine)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 8") {
      tituloDelContenidoEspecifico = "Cine 2025 - Parte 8: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información para Época 2025, Subtema Cine, Parte 8. (Contenido de ejemplo).";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 9") {
      tituloDelContenidoEspecifico = "Cine 2025 - Parte 9: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información para Época 2025, Subtema Cine, Parte 9. (Contenido de ejemplo).";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 10") {
      tituloDelContenidoEspecifico = "Cine 2025 - Parte 10: (Placeholder)";
      urlDelVideoEspecifico = "assets/musica5.mp4";
      descripcionDelContenidoEspecifico = "Información para Época 2025, Subtema Cine, Parte 10. (Contenido de ejemplo).";
      contenidoDefinido = true;
    }
  }
  // SUBTEMA: Música
  else if (NOMBRES_SUB_BOTONES[j] === "Música") {
    if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 2019
      tituloDelContenidoEspecifico = "Música 2019: Bandas Destacadas y Tendencias";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "**Tendencias Generales (Reflejadas hacia finales de la década 2010s):\n**" +
        "Los géneros urbanos latinos como el reguetón y el trap latino ganaron una inmensa popularidad. Fusión de la música regional mexicana con otros géneros (pop, rock, urbanos). Artistas como Natalia Lafourcade obtuvieron reconocimiento por su mezcla de folclore con sonidos contemporáneos.\n\n" +
        "**Banda Mexicana Influyente 2019:**\n" +
        "- **Sonic Emerson** (Tijuana)\n" +
        "  - Álbum: Si tan solo supiera por qué estoy aquí\n" +
        "  - Canción clave: \"Luz de Día\"\n" +
        "  - Impacto: Espíritu lo-fi y psicodelia setentera, guitarras distorsionadas y riffs narrativos.\n\n" +
        "**Banda Internacional Influyente 2019:**\n" +
        "- **Jinjer** (Ucrania)\n" +
        "  - Álbum: Macro\n" +
        "  - Canción clave: \"Judgement (& Punishment)\"\n" +
        "  - Impacto: Mezcla de metalcore y groove, reconocimiento internacional, destacando la voz de su vocalista."; // Fuente: 2010-2025_musica.md
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 2020
      tituloDelContenidoEspecifico = "Música 2020: Bandas Destacadas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "**Banda Mexicana Influyente 2020:**\n" +
        "- **Yan Bili** (Hermosillo)\n" +
        "  - Álbum: Música de peda Nanunaki\n" +
        "  - Canción clave: \"Existir\"\n" +
        "  - Impacto: Proyecto experimental que combinó humor y realidad, llevando de la risa al llanto con creatividad.\n\n" +
        "**Banda Internacional Influyente 2020:**\n" +
        "- **Girl in Red** (Noruega)\n" +
        "  - Álbum: If I Could Make It Go Quiet\n" +
        "  - Canción clave: \"Midnight Love\"\n" +
        "  - Impacto: Ícono para la comunidad LGBTQ+, abordando temas de amor y salud mental."; // Fuente: 2010-2025_musica.md
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 2021
      tituloDelContenidoEspecifico = "Música 2021: Bandas Destacadas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "**Banda Mexicana Influyente 2021:**\n" +
        "- **Amnl Prnt** (Ciudad de México)\n" +
        "  - Álbum: 0101\n" +
        "  - Canción clave: \"Universos\"\n" +
        "  - Impacto: Proyecto de Paulina Olea con electrónica experimental y voz etérea, creando texturas que inducen al trance.\n\n" +
        "**Banda Internacional Influyente 2021:**\n" +
        "- **Turnstile** (Estados Unidos)\n" +
        "  - Álbum: GLOW ON\n" +
        "  - Canción clave: \"BLACKOUT\"\n" +
        "  - Impacto: Enfoque fresco al hardcore punk, atrayendo a una nueva generación al género."; // Fuente: 2010-2025_musica.md
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 2022
      tituloDelContenidoEspecifico = "Música 2022: Bandas Destacadas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "**Banda Mexicana Influyente 2022:**\n" +
        "- **Comisario Pantera** (Milpa Alta)\n" +
        "  - Álbum: Instinto Felino\n" +
        "  - Canción clave: \"Amiga\"\n" +
        "  - Impacto: Mezcla de rock, pop rock e indie rock, consolidados en la escena mexicana, nominados a Indie-O Music Awards y Grammy Latinos.\n\n" +
        "**Banda Internacional Influyente 2022:**\n" +
        "- **Måneskin** (Italia)\n" +
        "  - Álbum: Teatro d'ira: Vol. I\n" +
        "  - Canción clave: \"Zitti e buoni\"\n" +
        "  - Impacto: Tras ganar Eurovisión, revitalizaron el rock en la escena pop europea, ganando fama internacional."; // Fuente: 2010-2025_musica.md
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 2023
      tituloDelContenidoEspecifico = "Música 2023: Bandas Destacadas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "**Banda Mexicana Influyente 2023:**\n" +
        "- **URSS Bajo el Árbol** (Ciudad de México)\n" +
        "  - Álbum: Ciclo\n" +
        "  - Canción clave: \"Las Aves Sin Alas\"\n" +
        "  - Impacto: Continuando su exploración en el rock progresivo, la banda lanzó su tercer álbum de estudio, consolidando su posición.\n\n" +
        "**Banda Internacional Influyente 2023:**\n" +
        "- **Avenged Sevenfold** (Estados Unidos)\n" +
        "  - Álbum: Life Is but a Dream...\n" +
        "  - Canción clave: \"Nobody\"\n" +
        "  - Impacto: Explorando estilos como jazz y soul, la banda de heavy metal desafió expectativas con este álbum experimental."; // Fuente: 2010-2025_musica.md
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 2024
      tituloDelContenidoEspecifico = "Música 2024: Bandas Destacadas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "**Banda Mexicana Influyente 2024:**\n" +
        "- **La Bande-Son Imaginaire** (Oaxaca)\n" +
        "  - Álbum: Synthesizer Magazine\n" +
        "  - Canción clave: \"Mexican Wave\"\n" +
        "  - Impacto: Álbum que fusionó darkwave europeo con la cosmovisión oaxaqueña, explorando aspectos oscuros de la naturaleza humana y llegando a escenarios internacionales.\n\n" +
        "**Banda Internacional Influyente 2024:**\n" +
        "- **Pavement** (Estados Unidos)\n" +
        "  - Álbum: Brighten the Corners: Nicene Creedence Ed. (Reedición)\n" +
        "  - Canción clave: \"Harness Your Hopes\"\n" +
        "  - Impacto: Resurgimiento de la banda indie de los 90 gracias a la viralización en Spotify, capturando nuevas audiencias."; // Fuente: 2010-2025_musica.md
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 2025
      tituloDelContenidoEspecifico = "Música 2025: Peso Pluma y Tendencias Regionales";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "**Tendencias Generales Continuadas hacia 2025:**\n" +
        "La música regional mexicana, particularmente los corridos tumbados, con artistas como Peso Pluma y Grupo Frontera encabezando las listas de éxitos internacionales. La cumbia experimenta un resurgimiento, a menudo con giros modernos y colaboraciones con artistas pop. El pop latino y urbano continúan prosperando. La música tejana experimenta un resurgimiento.\n\n" +
        "**Banda Mexicana Influyente 2025:**\n" +
        "- **Peso Pluma** (Guadalajara)\n" +
        "  - Álbum: Éxito Global\n" +
        "  - Canción clave: \"Ella Baila Sola\"\n" +
        "  - Impacto: Liderando la nueva era del 'boom' latino, Peso Pluma ha desplazado al reguetón en las listas de éxitos internacionales, fusionando géneros tradicionales con estilos urbanos.\n\n" +
        "**Banda Internacional Influyente 2025:**\n" +
        "- **Imagine Dragons** (Estados Unidos)\n" +
        "  - Álbum: Imagine Dragons: Live From The Hollywood Bowl\n" +
        "  - Canción clave: \"Believer\" (Versión en vivo)\n" +
        "  - Impacto: A pesar de las críticas, la banda continúa atrayendo a millones de jóvenes con su estilo accesible y letras que abordan temas sociales."; // Fuente: 2010-2025_musica.md
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 8") {
      tituloDelContenidoEspecifico = "Música 2025 - Parte 8: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información para Época 2025, Subtema Música, Parte 8. (Contenido de ejemplo).";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 9") {
      tituloDelContenidoEspecifico = "Música 2025 - Parte 9: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información para Época 2025, Subtema Música, Parte 9. (Contenido de ejemplo).";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 10") {
      tituloDelContenidoEspecifico = "Música 2025 - Parte 10: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información para Época 2025, Subtema Música, Parte 10. (Contenido de ejemplo).";
      contenidoDefinido = true;
    }
  }
  // SUBTEMA: Contexto México
  else if (NOMBRES_SUB_BOTONES[j] === "Contexto México") {
    if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 2019
      tituloDelContenidoEspecifico = "Contexto México 2019: T-MEC, Política Migratoria y Economía";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "En junio, bajo amenaza de aranceles por parte de Donald Trump, México acordó desplegar 6,000 efectivos de la Guardia Nacional en su frontera sur y expandir el programa \"Permanecer en México\".\n\n" +
        "México se convirtió en el primer país en ratificar el Tratado entre México, Estados Unidos y Canadá (T-MEC), reemplazando al TLCAN.\n\n" +
        "Carlos Urzúa renunció abruptamente a la Secretaría de Hacienda, citando discrepancias con las políticas económicas de AMLO.\n\n" +
        "La economía mexicana se contrajo un 0.1% en 2019, la primera contracción anual desde 2009, afectada por incertidumbre política y reducción en la inversión.\n\n" +
        "En enero, el salario mínimo nacional se incrementó en un 16%, y se duplicó en municipios de la frontera norte.\n\n" +
        "En agosto, manifestaciones feministas en Ciudad de México denunciaron la violencia de género y abusos policiales, evidenciando la preocupación por feminicidios e impunidad."; // Fuente: 2019.md (Contexto)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 2020
      tituloDelContenidoEspecifico = "Contexto México 2020: Impacto de la Pandemia COVID-19";
      urlDelVideoEspecifico = "assets/musica6.mp4";
      descripcionDelContenidoEspecifico =
        "La pandemia de COVID-19 tuvo un impacto significativo en la salud, la economía y el tejido social de México.\n\n" +
        "Este evento puso a prueba la capacidad del gobierno para responder a una crisis de gran magnitud, con consecuencias de gran alcance y duraderas para la nación."; // Fuente: 2020.md (Contexto)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 2021
      tituloDelContenidoEspecifico = "Contexto México 2021: Contrastes, Elecciones y Derechos";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "México vivió un año de contrastes: avances históricos en derechos sociales, desafíos democráticos y una recuperación económica desigual tras la pandemia.\n\n" +
        "La economía creció un 4.8%, impulsada por exportaciones y recuperación en manufactura y automotriz, aunque persistieron altos niveles de pobreza e informalidad.\n\n" +
        "Se realizaron las elecciones más grandes en la historia del país, marcadas por violencia sin precedentes con más de 90 candidatos asesinados.\n\n" +
        "Por primera vez, dos mujeres transgénero, María Clemente García y Salma Luévano, fueron electas diputadas federales por MORENA.\n\n" +
        "En septiembre, la Suprema Corte declaró inconstitucional penalizar el aborto, un hito en derechos reproductivos.\n\n" +
        "Iniciativas como el Refugio Pesquero de Celestún demostraron esfuerzos comunitarios de conservación marina.\n\n" +
        "La prohibición de corridas de toros en varias regiones generó intenso debate social."; // Fuente: 2021.md (Contexto)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 2022
      tituloDelContenidoEspecifico = "Contexto México 2022: Democracia, Economía y Eventos";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Se observaron preocupaciones sobre el debilitamiento de instituciones democráticas, incluyendo ataques a la prensa y tensiones con el poder judicial.\n\n" +
        "La economía creció un 4.5% interanual, sin alcanzar niveles pre-pandemia. La inflación alcanzó un 7.82%, la más alta en más de dos décadas.\n\n" +
        "Se implementaron avances como un aumento del salario mínimo del 22% y la ampliación de las vacaciones a 12 días.\n\n" +
        "El 19 de septiembre, un sismo de magnitud 7.7 sacudió el país. El Festival Internacional Santa Lucía en Nuevo León ofreció más de 335 eventos.\n\n" +
        "Tras problemas con boletos para el concierto de Bad Bunny, el presidente López Obrador solicitó al artista un concierto gratuito en el Zócalo."; // Fuente: 2022.md (Contexto)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 2023
      tituloDelContenidoEspecifico = "Contexto México 2023: 'Superpeso' y Migración Récord";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "El \"superpeso\", después de un periodo de apreciación, experimentó una depreciación, destacando la volatilidad de la economía global y su impacto en México.\n\n" +
        "El gobierno mexicano detectó niveles récord de migración irregular, subrayando los desafíos continuos de la migración y la gestión fronteriza."; // Fuente: 2023.md (Contexto)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 2024
      tituloDelContenidoEspecifico = "Contexto México 2024: Hito Presidencial y Reformas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Claudia Sheinbaum fue elegida como la primera mujer presidenta de México, un hito histórico. Con su toma de posesión el 1 de octubre, finalizó la presidencia de Andrés Manuel López Obrador.\n\n" +
        "La coalición gobernante Morena (con PT y PVEM) logró control de dos tercios del Congreso, permitiendo cambios legislativos significativos, pero generando preocupaciones sobre controles y equilibrios.\n\n" +
        "Se promulgó una controvertida reforma constitucional al Poder Judicial, incluyendo la elección popular de jueces.\n\n" +
        "La segunda victoria de Donald Trump en EE.UU. generó incertidumbre económica por amenazas de aranceles y políticas migratorias.\n\n" +
        "Continuaron niveles récord de migración irregular. Se reportó la captura de Ismael \"El Mayo\" Zambada. El conflicto armado entre cárteles en Chiapas impactó a la población local. El gobierno anunció una \"histórica\" incautación de fentanilo."; // Fuente: 2024.md (Contexto)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 2025
      tituloDelContenidoEspecifico = "Contexto México 2025: Primer Año de Nueva Administración (Placeholder)";
      urlDelVideoEspecifico = "assets/musica6.mp4";
      descripcionDelContenidoEspecifico =
        "El año 2025 representa el inicio y consolidación de la nueva administración presidencial en México.\n\n" +
        "Se anticipa la implementación de las políticas y reformas prometidas, así como la respuesta a los desafíos económicos, sociales y de seguridad heredados y emergentes.\n" +
        "(Información específica para eventos de Contexto México en 2025 pendiente de agregarse).";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 8") {
      tituloDelContenidoEspecifico = "Contexto México 2025 - Parte 8: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información para Época 2025, Subtema Contexto México, Parte 8. (Contenido de ejemplo).";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 9") {
      tituloDelContenidoEspecifico = "Contexto México 2025 - Parte 9: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información para Época 2025, Subtema Contexto México, Parte 9. (Contenido de ejemplo).";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 10") {
      tituloDelContenidoEspecifico = "Contexto México 2025 - Parte 10: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información para Época 2025, Subtema Contexto México, Parte 10. (Contenido de ejemplo).";
      contenidoDefinido = true;
    }
  }
  // SUBTEMA: Moda
  else if (NOMBRES_SUB_BOTONES[j] === "Moda") {
    if (textosBotonesAnoEspecifico[k] === "Part 1") { // Año 2019 - Tendencias de finales de la década de 2010
      tituloDelContenidoEspecifico = "Moda 2019: Sostenibilidad, Ética y E-commerce";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Hacia finales de la década de 2010, se observó una mayor evolución de las tendencias establecidas y la aparición de nuevos enfoques.\n\n" +
        "Un factor cada vez más importante fue el enfoque en la sostenibilidad y la moda ética, que posiblemente se reflejó en las decisiones de los consumidores y diseñadores mexicanos.\n\n" +
        "El comercio electrónico también desempeñó un papel creciente al hacer que una variedad más amplia de moda fuera accesible en todo el país, transformando la manera de consumir y descubrir nuevas propuestas."; // Fuente: 2010-2015_Moda.md (asumiendo que cubre esta info)
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 2") { // Año 2020
      tituloDelContenidoEspecifico = "Moda 2020: Impacto de la Pandemia COVID-19";
      urlDelVideoEspecifico = "assets/musica5.mp4";
      descripcionDelContenidoEspecifico =
        "Los primeros años de la década de 2020 estuvieron marcados por la pandemia de COVID-19, que tuvo un impacto profundo en la moda.\n\n" +
        "La necesidad de confinamientos y el aumento del trabajo remoto llevaron a un dominio de la ropa cómoda y los estilos casuales.\n\n" +
        "La ropa deportiva, las prendas de punto suaves y la ropa holgada se convirtieron en elementos básicos del guardarropa.\n\n" +
        "Además, el cierre de tiendas físicas y las restricciones impulsaron un aumento significativo en las compras de moda en línea."; // Fuente: 2010-2015_Moda.md
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 3") { // Año 2021
      tituloDelContenidoEspecifico = "Moda 2021: Continuidad de Tendencias Pandémicas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Durante 2021, persistió la influencia de la pandemia en las tendencias de moda. La comodidad siguió siendo prioritaria, manteniendo la popularidad del _athleisure_.\n\n" +
        "El comercio electrónico continuó su expansión como canal principal de compra."; // Fuente: 2010-2015_Moda.md
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 4") { // Año 2022
      tituloDelContenidoEspecifico = "Moda 2022: Transición y Nuevas Perspectivas";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Se anticipa una transición gradual desde los estilos dominados por la pandemia, con un posible retorno a una vestimenta más formal, aunque la comodidad adquirida dejó una huella duradera.\n\n" +
        "La sostenibilidad y el consumo ético siguieron siendo consideraciones importantes."; // Fuente: 2010-2015_Moda.md
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 5") { // Año 2023
      tituloDelContenidoEspecifico = "Moda 2023: Sostenibilidad y Expresión Post-Pandemia";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Se espera que surjan nuevas tendencias que reflejen los estilos de vida post-pandemia, fusionando comodidad con expresión personal.\n\n" +
        "El enfoque en la sostenibilidad y la moda ética continuó ganando tracción."; // Fuente: 2010-2015_Moda.md
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 6") { // Año 2024
      tituloDelContenidoEspecifico = "Moda 2024: Diseñadores Mexicanos Destacados";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Diseñadores mexicanos como Carla Fernández (sostenibilidad y colaboración artesanal), Kris Goyri (siluetas femeninas, color) y Lorena Saravia (elegancia moderna) continuaron destacando."; // Fuente: 2010-2015_Moda.md
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 7") { // Año 2025
      tituloDelContenidoEspecifico = "Moda 2025: Innovación y Estilo Urbano";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico =
        "Otros diseñadores como Bárbara Sánchez-Kane y Yakampot aportaron propuestas innovadoras. El estilo urbano en ciudades como CDMX reflejó una mezcla de influencias globales y locales."; // Fuente: 2010-2015_Moda.md
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 8") {
      tituloDelContenidoEspecifico = "Moda 2025 - Parte 8: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información sobre Moda para la Época 2025, Parte 8. (Contenido de ejemplo).";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 9") {
      tituloDelContenidoEspecifico = "Moda 2025 - Parte 9: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información sobre Moda para la Época 2025, Parte 9. (Contenido de ejemplo).";
      contenidoDefinido = true;
    } else if (textosBotonesAnoEspecifico[k] === "Part 10") {
      tituloDelContenidoEspecifico = "Moda 2025 - Parte 10: (Placeholder)";
      urlDelVideoEspecifico = null;
      descripcionDelContenidoEspecifico = "Información para Época 2025, Subtema Moda, Parte 10. (Contenido de ejemplo).";
      contenidoDefinido = true;
    }
  }
}
// --- FIN DEL BLOQUE PARA ÉPOCA 2025 ---
// --- FIN DEL BLOQUE PARA ÉPOCA 2025 ---
// --- FIN DEL BLOQUE PARA ÉPOCA 2025 ---


          // --- A continuación, contenido por defecto en caso de que contenidoDefinido === false ---
          if (!contenidoDefinido) {
            if ((i + j + k) % 3 === 0 && k < 3) {
              urlDelVideoEspecifico = 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4';
            }
            tituloDelContenidoEspecifico = `${textosBotonesEpocas[i]} | ${NOMBRES_SUB_BOTONES[j]} | ${textosBotonesAnoEspecifico[k]}`;
            descripcionDelContenidoEspecifico = `Contenido para ${textosBotonesEpocas[i]}, ${NOMBRES_SUB_BOTONES[j]}, parte ${k + 1}. (Información específica no cargada para esta sección).`;
          }

          // Finalmente empujamos el objeto resultante en el array jerárquico
          subTemasData.push({
            titulo: tituloDelContenidoEspecifico,
            urlVideo: urlDelVideoEspecifico,
            descripcion: descripcionDelContenidoEspecifico
          });
        }
        epocasData.push(subTemasData);
      }
      contenidoPorAnoEspecifico.push(epocasData);
    }


  } catch (e) {
    console.error("ERROR CRÍTICO DURANTE SETUP:", e);
    throw e;
  }
  console.log("Setup completado exitosamente.");
}

function actualizarColoresMoldPorEpoca(idEpocaSeleccionada) {
  let colores = coloresMoldPorEpoca.default;
  if (idEpocaSeleccionada !== -1 && textosBotonesEpocas[idEpocaSeleccionada]) {
    let nombreEpoca = textosBotonesEpocas[idEpocaSeleccionada];
    if (coloresMoldPorEpoca[nombreEpoca]) {
      colores = coloresMoldPorEpoca[nombreEpoca];
    }
  }
  colorPrincipalMoldActual = colores.principal;
  colorAtraidoMoldActual = colores.atraido;
}

/////////////////////////////////////////////////////////////////////////////////////
// ------------------------------------ draw() --------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
function draw() {
  if (firstDrawCall) {
    console.log("Iniciando primer frame de draw().");
    firstDrawCall = false;
  }
  if (width <= 0 || height <= 0) {
    return;
  }

  // Fondo
  if (necesitaBorradoLimpio) {
    background(0);
    necesitaBorradoLimpio = false;
  } else {
    background(0, 0, 0, ALPHA_ESTELAS_NEGRO);
  }

  // Marco perimetral
  push();
  noFill();
  strokeWeight(4);
  stroke(btnColBordeNormal);
  rect(btnStrokeWeight / 2, btnStrokeWeight / 2, width - btnStrokeWeight, height - btnStrokeWeight);
  pop();

  // Dibujar motas (excepto en la primera pantalla real de inicio)
  try {
    if (!esPrimerInicioReal) {
      if (width > 0 && height > 0 && d > 0) {
        loadPixels();
      }
      let limSupMolds = moldsEnFaseDeAparicion ? numMoldsVisibles : molds.length;
      if (moldsEnFaseDeAparicion) {
        numMoldsVisibles += RITMO_APARICION_MOLDS;
        if (numMoldsVisibles >= molds.length) {
          numMoldsVisibles = molds.length;
          moldsEnFaseDeAparicion = false;
        }
        limSupMolds = numMoldsVisibles;
      }
      for (let i = 0; i < limSupMolds; i++) {
        if (molds[i]) {
          molds[i].update();
          molds[i].display();
        }
      }
    }

    // Lógica por pantalla
    let textoActualBotonPrincipal;

    // --- PANTALLA INICIO ---
    if (pantallaActual === "inicio" && esPrimerInicioReal) {
      textoActualBotonPrincipal = "PULSA PARA INICIAR";
      let tamTextoPrincipal = min(width / 12, height / 8, 60);

      // Área clickeable grande
      botonInicioAncho = width * 0.6;
      botonInicioAlto = tamTextoPrincipal * 2.5;
      botonInicioX = width / 2 - botonInicioAncho / 2;
      botonInicioY = height / 2 - botonInicioAlto / 2;

      // Parpadeo de texto
      if (floor(frameCount / 25) % 2 === 0) {
        fill(btnColTextoNormal);
        noStroke();
        textFont('monospace', tamTextoPrincipal);
        textAlign(CENTER, CENTER);
        text(textoActualBotonPrincipal, width / 2, height / 2);
      }

      // Efecto ASCII en todo el canvas
      if (frameCount % 5 === 0) {
        inicioAsciiParticles = [];
        for (let i = 0; i < NUM_INICIO_ASCII_PARTICLES * 2; i++) {
          inicioAsciiParticles.push({
            char: random(asciiChars),
            x: random(width),
            y: random(height),
            size: tamTextoPrincipal * random(0.1, 0.25),
            alpha: random(40, 120)
          });
        }
      }
      for (let p of inicioAsciiParticles) {
        fill(
          red(btnColTextoNormal),
          green(btnColTextoNormal),
          blue(btnColTextoNormal),
          p.alpha * (0.3 + sin(frameCount * 0.05 + p.y * 0.02 + p.x * 0.005) * 0.7)
        );
        textFont('monospace', p.size + sin(frameCount * 0.04 + p.x * 0.02) * 1.5);
        text(p.char, p.x, p.y);
      }
    }
    else if (pantallaActual === "inicio" && !esPrimerInicioReal) {
      // Botón “EXPLICACIÓN” en la parte superior
      let btnExplicacionW = min(width * 0.35, 300);
      let btnExplicacionH = 50;
      botonInicioX = (width - btnExplicacionW) / 2;
      botonInicioY = ALTURA_ICONOS_SUPERIORES;
      botonInicioAncho = btnExplicacionW;
      botonInicioAlto = btnExplicacionH;

      textoActualBotonPrincipal = "EXPLICACIÓN";
      let state = "normal";
      let btnIdUnico = 'inicio_btn_explicacion';
      if (
        currentPressedButtonInfo.type === 'inicio_explicacion_btn' &&
        currentPressedButtonInfo.id === btnIdUnico
      ) {
        state = "pressed";
      } else if (
        mouseX >= botonInicioX &&
        mouseX <= botonInicioX + botonInicioAncho &&
        mouseY >= botonInicioY &&
        mouseY <= botonInicioY + botonInicioAlto
      ) {
        state = "hover";
      }

      if (!menuHamburguesaAbierto) {
        drawStyledButton(
          botonInicioX,
          botonInicioY,
          botonInicioAncho,
          botonInicioAlto,
          textoActualBotonPrincipal,
          state,
          0.45,
          'monospace'
        );
      }
    }

    // --- Pantallas específicas ---
    if (pantallaActual === "explicacion") {
      pararOcultarVideoContenidoCaja();
      drawPantallaExplicacion();
    }
    else if (pantallaActual === "navegacion_jerarquica") {
      if (miVideo && videoCargado) miVideo.hide();
      textAlign(CENTER, CENTER);

      // --- ESTADO: botones grandes y centrados (intro) ---
      if (estadoPresentacionEpocas === "grandes_centrados_intro") {
        for (let i = 0; i < textosBotonesEpocas.length; i++) {
          let btn = botonesEpocaGrandesInfo[i];
          if (!btn) continue;
          let cX = btn.x;
          let cY = btn.y;
          let cW = btn.w;
          let cH = btn.h;

          let mS_epoca = (
            mouseX >= cX &&
            mouseX <= cX + cW &&
            mouseY >= cY &&
            mouseY <= cY + cH
          );
          let state = "normal";
          if (
            currentPressedButtonInfo.type === 'epoca_intro' &&
            currentPressedButtonInfo.id === i
          ) {
            state = "pressed";
          } else if (mS_epoca) {
            state = "hover";
          }

          drawStyledButton(cX, cY, cW, cH, textosBotonesEpocas[i], state, 0.6, 'monospace');
        }
        // No dibujar nada más hasta que el usuario haga click
      }
      // --- ESTADO: barra superior con botones reducidos e interactivos ---
      else if (estadoPresentacionEpocas === "barra_superior") {
        // Dibujar botones de época (barra superior fija)
        for (let i = 0; i < textosBotonesEpocas.length; i++) {
          let btn = botonesEpocaPequeñosInfo[i];
          if (!btn) continue;
          let cX = btn.x;
          let cY = yBarraEpocas;
          let cW = btn.w;
          let cH = btn.h;

          let esS_epoca = (epocaSeleccionadaId === i);
          let mS_epoca = (
            mouseX >= cX &&
            mouseX <= cX + cW &&
            mouseY >= cY &&
            mouseY <= cY + cH
          );

          let state = "normal";
          if (
            currentPressedButtonInfo.type === 'epoca' &&
            currentPressedButtonInfo.id === i
          ) {
            state = "pressed";
          } else if (esS_epoca) {
            state = "selected";
          } else if (mS_epoca) {
            state = "hover";
          }

          drawStyledButton(cX, cY, cW, cH, textosBotonesEpocas[i], state, 0.45, 'monospace');
        }

        // Limpiar o preparar puntos de interés
        puntosDeInteresAdicionales = [];

        // --- Si hay época seleccionada, mostrar subtemas ---
        subBotonesInfo = [];
        if (epocaSeleccionadaId !== -1) {
          for (let i = 0; i < NOMBRES_SUB_BOTONES.length; i++) {
            let bY = yInicioColumnasVerticales + i * (botonSubTemaAlto + espacioVerticalBotonesSubTema);
            subBotonesInfo.push({
              x: xColumnaSubTemas,
              y: bY,
              w: botonSubTemaAncho,
              h: botonSubTemaAlto,
              texto: NOMBRES_SUB_BOTONES[i],
              id: i
            });

            let esS_sub = (subTemaSeleccionadoId === i);
            let mS_sub = (
              mouseX >= xColumnaSubTemas &&
              mouseX <= xColumnaSubTemas + botonSubTemaAncho &&
              mouseY >= bY &&
              mouseY <= bY + botonSubTemaAlto
            );

            let state = "normal";
            if (
              currentPressedButtonInfo.type === 'tema' &&
              currentPressedButtonInfo.id === i
            ) {
              state = "pressed";
            } else if (esS_sub) {
              state = "selected";
            } else if (mS_sub) {
              state = "hover";
            }

            drawStyledButton(
              xColumnaSubTemas,
              bY,
              botonSubTemaAncho,
              botonSubTemaAlto,
              NOMBRES_SUB_BOTONES[i].toUpperCase(),
              state,
              0.4,
              'Arial'
            );
          }
        }

        // --- Partes / Años específicos (columna de la derecha) ---
        botonesAnoEspecificoInfo = [];
        if (epocaSeleccionadaId !== -1 && subTemaSeleccionadoId !== -1) {
          // Determinar posición X de la columna de “partes”
          let colAnosX = xColumnaSubTemas + ANCHO_COLUMNA_OFFSET + 20;
          let subDatos = subBotonesInfo.find(b => b.id === subTemaSeleccionadoId);
          if (subDatos) {
            colAnosX = xColumnaSubTemas + botonSubTemaAncho + ANCHO_COLUMNA_OFFSET + 20;
          }
          xColumnaAnosEspecificos = colAnosX;
          let yBAE = yInicioColumnasVerticales;

          for (let i = 0; i < textosBotonesAnoEspecifico.length; i++) {
            let bY = yBAE + i * (botonAnoEspecificoAlto + espacioVerticalBotonesAnoEspecifico);
            let curBtnPartInfo = {
              x: xColumnaAnosEspecificos,
              y: bY,
              w: botonAnoEspecificoAncho,
              h: botonAnoEspecificoAlto,
              texto: textosBotonesAnoEspecifico[i],
              id: i
            };
            botonesAnoEspecificoInfo.push(curBtnPartInfo);

            // Agregar punto de interés para las motas
            puntosDeInteresAdicionales.push({
              x: curBtnPartInfo.x + curBtnPartInfo.w / 2,
              y: curBtnPartInfo.y + curBtnPartInfo.h / 2,
              id: i
            });

            let esS_ano = (anoEspecificoSeleccionadoId === i);
            let mS_ano = (
              mouseX >= xColumnaAnosEspecificos &&
              mouseX <= xColumnaAnosEspecificos + botonAnoEspecificoAncho &&
              mouseY >= bY &&
              mouseY <= bY + botonAnoEspecificoAlto
            );

            let state = "normal";
            if (
              currentPressedButtonInfo.type === 'part' &&
              currentPressedButtonInfo.id === i
            ) {
              state = "pressed";
            } else if (esS_ano) {
              state = "selected";
            } else if (mS_ano) {
              state = "hover";
            }

            drawStyledButton(
              curBtnPartInfo.x,
              curBtnPartInfo.y,
              curBtnPartInfo.w,
              curBtnPartInfo.h,
              curBtnPartInfo.texto,
              state,
              0.5,
              'monospace'
            );

            // Efecto decorativo según tema seleccionado
            let styleData = subButtonStyles[subTemaSeleccionadoId];
            if (styleData && styleData.yearInteraction && (mS_ano || esS_ano)) {
              drawYearButtonInteractionEffect(
                curBtnPartInfo.x,
                curBtnPartInfo.y,
                curBtnPartInfo.w,
                curBtnPartInfo.h,
                styleData.yearInteraction,
                true
              );
            }
          }
        }

        // --- Conexiones gráficas entre subtema y partes ---
        if (
          epocaSeleccionadaId !== -1 &&
          subTemaSeleccionadoId !== -1 &&
          botonesAnoEspecificoInfo.length > 0
        ) {
          let infoBotonTemaSel = subBotonesInfo.find(b => b.id === subTemaSeleccionadoId);
          if (infoBotonTemaSel) {
            let temaCentroX = infoBotonTemaSel.x + infoBotonTemaSel.h / 2;
            let temaCentroY = infoBotonTemaSel.y + infoBotonTemaSel.h / 2;
            let raizColor = btnColBordeNormal;

            push();
            stroke(raizColor);
            noFill();
            for (let partBtnInfo of botonesAnoEspecificoInfo) {
              if (!partBtnInfo) continue;

              strokeWeight(1.5 + sin(frameCount * 3 + partBtnInfo.id * 5) * 0.7);
              let startX = infoBotonTemaSel.x + infoBotonTemaSel.w;
              let startY = temaCentroY;
              let endX = partBtnInfo.x;
              let endY = partBtnInfo.y + partBtnInfo.h / 2;

              let midX = (startX + endX) / 2;
              let midY = (startY + endY) / 2;
              let dx = endX - startX;
              let dy = endY - startY;
              let len = sqrt(dx * dx + dy * dy);
              let noiseVal = noise(partBtnInfo.id * 20 + frameCount * 0.01);
              let curveMag = map(noiseVal, 0, 1, -len * 0.15, len * 0.15);
              let ctrlX = midX - (dy / max(1, len)) * curveMag;
              let ctrlY = midY + (dx / max(1, len)) * curveMag;

              // Si el control queda fuera de rango, revertir leve
              if (len > 10) {
                if (
                  (ctrlX - startX) * dx + (ctrlY - startY) * dy < 0 ||
                  (endX - ctrlX) * dx + (endY - ctrlY) * dy < 0
                ) {
                  ctrlX = midX + (dx / len) * curveMag * 0.2;
                  ctrlY = midY + (dy / len) * curveMag * 0.2;
                }
              }

              beginShape();
              vertex(startX, startY);
              quadraticVertex(ctrlX, ctrlY, endX, endY);
              endShape();
            }
            pop();
          }
        }

        // --- Caja de contenido al hacer clic en una parte ---
        if (
          mostrarContenidoCaja &&
          anoEspecificoSeleccionadoId !== -1 &&
          botonesAnoEspecificoInfo &&
          botonesAnoEspecificoInfo.length > 0
        ) {
          // Calcular posición X de la caja
          let xCB = xColumnaAnosEspecificos;
          if (botonesAnoEspecificoInfo.length > 0) {
            xCB = xColumnaAnosEspecificos + botonAnoEspecificoAncho + ANCHO_COLUMNA_OFFSET;
          } else if (
            subBotonesInfo.length > 0 &&
            subTemaSeleccionadoId !== -1 &&
            subBotonesInfo.find(b => b.id === subTemaSeleccionadoId)
          ) {
            xCB = xColumnaSubTemas + botonSubTemaAncho + ANCHO_COLUMNA_OFFSET;
          } else {
            xCB = xColumnaSubTemas + ANCHO_COLUMNA_OFFSET;
          }

          let cajaY = yInicioColumnasVerticales - 20;
          if (cajaY < yBarraEpocas + botonEpocaAltoOriginal + 10) {
            cajaY = yBarraEpocas + botonEpocaAltoOriginal + 10;
          }

          let anC = max(350, width - xCB - 20);
          let cajaH = height - cajaY - 20;

          // Dibujar fondo de caja
          fill(245, 245, 245, 250);
          stroke(150);
          strokeWeight(1);
          rect(xCB, cajaY, anC, cajaH, 10);

          // Título
          fill(20, 20, 20);
          textSize(20);
          textAlign(CENTER, TOP);
          let yAC = cajaY + PADDING_CAJA_TEXTO;
          text(tituloContenidoActual, xCB + anC / 2, yAC);
          yAC += textSize() + ESPACIO_ENTRE_ELEMENTOS_CAJA;

          // Video (si existe)
          if (urlVideoContenidoActual && urlVideoContenidoActual !== "") {
            let vW = anC - 2 * PADDING_CAJA_TEXTO;
            let vH = ALTO_VIDEO_CONTENIDO;
            if (videoContenidoCaja && videoContenidoCajaCargado) {
              videoContenidoCaja.position(xCB + PADDING_CAJA_TEXTO, yAC);
              videoContenidoCaja.size(vW, vH);
              videoContenidoCaja.show();
            } else {
              // Dibujar rectángulo “Cargando video”
              fill(200);
              textSize(16);
              textAlign(CENTER, CENTER);
              rect(xCB + PADDING_CAJA_TEXTO, yAC, vW, vH);
              fill(50);
              text("Cargando video...", xCB + PADDING_CAJA_TEXTO + vW / 2, yAC + vH / 2);
            }
            yAC += vH + ESPACIO_ENTRE_ELEMENTOS_CAJA;
          } else {
            // Texto “No hay video disponible”
            fill(80);
            textSize(14);
            textAlign(CENTER, TOP);
            text("No hay video disponible.", xCB + anC / 2, yAC);
            yAC += 20 + ESPACIO_ENTRE_ELEMENTOS_CAJA;
          }

          // Descripción de texto (sin truncar)
          fill(colorExplicacionParrafo);
          noStroke();
          textSize(16);
          textAlign(LEFT, TOP);
          let textBoxWidth = anC - 2 * PADDING_CAJA_TEXTO;
          let textBoxHeight = cajaH - (yAC - cajaY) - PADDING_CAJA_TEXTO;
          textLeading(textSize() * 1.4);
          text(
            descripcionContenidoActual,
            xCB + PADDING_CAJA_TEXTO,
            yAC,
            textBoxWidth,
            textBoxHeight
          );
        } else {
          pararOcultarVideoContenidoCaja();
        }
      } // Fin de estado "barra_superior"
    }
    else if (pantallaActual === "about_marca") {
      drawPantallaAboutMarca();
    }

    // --- Botón Atrás y Menú Hamburguesa ---
    if (pantallaActual !== 'inicio' || !esPrimerInicioReal) {
      // Botón Atrás (solo si no está abierto el menú hamburguesa)
      if (
        !menuHamburguesaAbierto &&
        (pantallaActual === "navegacion_jerarquica" ||
         pantallaActual === "about_marca" ||
         pantallaActual === "explicacion")
      ) {
        botonAtrasX = MARGEN_LATERAL_ATRAS + 10;
        botonAtrasY = ALTURA_ICONOS_SUPERIORES;

        let mSA = (
          mouseX >= botonAtrasX &&
          mouseX <= botonAtrasX + botonAtrasAncho &&
          mouseY >= botonAtrasY &&
          mouseY <= botonAtrasY + botonAtrasAlto
        );
        let state = "normal";
        if (currentPressedButtonInfo.type === 'atras') {
          state = "pressed";
        } else if (mSA) {
          state = "hover";
        }
        drawStyledButton(botonAtrasX, botonAtrasY, botonAtrasAncho, botonAtrasAlto, "<", state, 0.6, 'monospace');
      }
      drawMenuHamburguesa();
    }

  } catch (e) {
    console.error("ERROR EN DRAW:", e);
  }
}

/////////////////////////////////////////////////////////////////////////////////////
// --------------------------- Pantalla Explicación -------------------------------
/////////////////////////////////////////////////////////////////////////////////////
function drawPantallaExplicacion() {
  if (
    indiceExplicacionActual < 0 ||
    indiceExplicacionActual >= contenidoExplicaciones.length
  ) {
    indiceExplicacionActual = 0;
    if (contenidoExplicaciones.length === 0) {
      navegarA("inicio");
      return;
    }
  }

  explicacionCajaW = min(width * 0.85, 800);
  explicacionCajaH = min(height * 0.85, 650);
  explicacionCajaX = (width - explicacionCajaW) / 2;
  explicacionCajaY = (height - explicacionCajaH) / 2;

  // Regenerar textura de muro si ha cambiado tamaño
  if (
    !gfxMuroConcreto ||
    gfxMuroConcreto.width !== floor(explicacionCajaW) ||
    gfxMuroConcreto.height !== floor(explicacionCajaH)
  ) {
    if (explicacionCajaW > 0 && explicacionCajaH > 0) {
      gfxMuroConcreto = createGraphics(floor(explicacionCajaW), floor(explicacionCajaH));
      dibujarTexturaMuroEnGraphics(gfxMuroConcreto, floor(explicacionCajaW), floor(explicacionCajaH));
      if (gfxGrietas) gfxGrietas = null;
      necesitaRedibujarGrietas = true;
      grietasMuro = [];
    }
  }

  // Dibujar textura base
  if (gfxMuroConcreto) {
    image(gfxMuroConcreto, explicacionCajaX, explicacionCajaY);
  } else {
    push();
    fill(colorMuroFondo);
    noStroke();
    rect(explicacionCajaX, explicacionCajaY, explicacionCajaW, explicacionCajaH, 5);
    pop();
  }

  // Generar nuevas grietas cada cierto tiempo
  if (frameCount % 300 === 0 && grietasMuro.length < 8 && explicacionCajaW > 0) {
    grietasMuro.push(new Grieta(
      random(explicacionCajaW * 0.1, explicacionCajaW * 0.9),
      random(explicacionCajaH * 0.1, explicacionCajaH * 0.9),
      explicacionCajaW,
      explicacionCajaH
    ));
    necesitaRedibujarGrietas = true;
  }

  let algunaCrecio = false;
  if (frameCount % 4 === 0) {
    for (let grieta of grietasMuro) {
      if (grieta.crecer()) {
        algunaCrecio = true;
      }
    }
  }
  if (algunaCrecio) {
    necesitaRedibujarGrietas = true;
  }

  // Regenerar buffer de grietas si es necesario
  if (necesitaRedibujarGrietas && explicacionCajaW > 0 && explicacionCajaH > 0) {
    if (!gfxGrietas ||
        gfxGrietas.width !== floor(explicacionCajaW) ||
        gfxGrietas.height !== floor(explicacionCajaH)) {
      gfxGrietas = createGraphics(floor(explicacionCajaW), floor(explicacionCajaH));
    }
    gfxGrietas.clear();
    for (let grieta of grietasMuro) {
      grieta.dibujar(gfxGrietas);
    }
    necesitaRedibujarGrietas = false;
  }

  // Dibujar grietas encima
  if (gfxGrietas) {
    image(gfxGrietas, explicacionCajaX, explicacionCajaY);
  }

  // Fondo semitransparente detrás del texto para mejorar legibilidad
  push();
  fill(255, 255, 255, 200);
  noStroke();
  rect(
    explicacionCajaX + PADDING_CAJA_TEXTO,
    explicacionCajaY + PADDING_CAJA_TEXTO,
    explicacionCajaW - 2 * PADDING_CAJA_TEXTO,
    explicacionCajaH - 2 * PADDING_CAJA_TEXTO,
    8
  );
  pop();

  // Mostrar título o video o párrafo de la diapositiva
  let sA = contenidoExplicaciones[indiceExplicacionActual];
  let yO = explicacionCajaY + PADDING_CAJA_TEXTO * 2;
  let cA = explicacionCajaW - PADDING_CAJA_TEXTO * 3;

  // Título
  fill(colorExplicacionTitulo);
  textSize(constrain(explicacionCajaW / 22, 22, 36));
  textAlign(CENTER, TOP);
  text(sA.titulo, explicacionCajaX + explicacionCajaW / 2, yO);
  yO += textSize() * 1.6 + ESPACIO_ENTRE_ELEMENTOS_CAJA * 1.2;

  if (sA.tipo === "video") {
    if (miVideo && videoCargado) {
      let vMH = explicacionCajaH * 0.5;
      let vW = cA * 0.85;
      let vOW = miVideo.width || 16;
      let vOH = miVideo.height || 9;
      let vH = vW * (vOH / vOW);
      if (vH > vMH) {
        vH = vMH;
        vW = vH * (vOW / vOH);
      }
      let vX = explicacionCajaX + (explicacionCajaW - vW) / 2;
      if (yO + vH > explicacionCajaY + explicacionCajaH - 90) {
        vH = max(50, explicacionCajaY + explicacionCajaH - 90 - yO);
        vW = vH * (vOW / vOH);
        vX = explicacionCajaX + (explicacionCajaW - vW) / 2;
      }
      if (vW > 0 && vH > 0) image(miVideo, vX, yO, vW, vH);
      if (miVideo.elt && miVideo.elt.readyState >= 2) {
        miVideo.loop ? miVideo.loop() : miVideo.play();
      }
      miVideo.style('display', 'none');
      yO += vH + ESPACIO_ENTRE_ELEMENTOS_CAJA;
    } else {
      fill(colorExplicacionParrafo);
      textSize(16);
      textAlign(CENTER, TOP);
      text(
        "Cargando video...",
        explicacionCajaX + explicacionCajaW / 2,
        yO
      );
      yO += textSize() + ESPACIO_ENTRE_ELEMENTOS_CAJA;
    }
  } else {
    if (miVideo && videoCargado) {
      miVideo.pause();
      miVideo.hide();
    }
    fill(colorExplicacionParrafo);
    textSize(constrain(explicacionCajaW / 38, 15, 19));
    textAlign(LEFT, TOP);
    textLeading(textSize() * 1.4);

    // Caja de texto ajustada para ocupar lo que queda del área interior
    let textoBoxWidth = cA;
    let textoBoxHeight = explicacionCajaH - (yO - explicacionCajaY) - ESPACIO_ENTRE_ELEMENTOS_CAJA * 2;
    text(
      sA.parrafo,
      explicacionCajaX + PADDING_CAJA_TEXTO * 1.5,
      yO,
      textoBoxWidth,
      textoBoxHeight
    );
  }

  // Botón “SIGUIENTE >”
  explicacionBtnSiguienteW = 220;
  explicacionBtnSiguienteH = 50;
  explicacionBtnSiguienteX = explicacionCajaX + (explicacionCajaW - explicacionBtnSiguienteW) / 2;
  explicacionBtnSiguienteY = explicacionCajaY + explicacionCajaH - explicacionBtnSiguienteH - PADDING_CAJA_TEXTO * 1.2;

  let mouseSobreBtnSig = (
    mouseX >= explicacionBtnSiguienteX &&
    mouseX <= explicacionBtnSiguienteX + explicacionBtnSiguienteW &&
    mouseY >= explicacionBtnSiguienteY &&
    mouseY <= explicacionBtnSiguienteY + explicacionBtnSiguienteH
  );
  let btnSigState = "normal";
  if (
    currentPressedButtonInfo.type === 'explicacion_siguiente' &&
    currentPressedButtonInfo.id === 'btn_expl_next'
  ) {
    btnSigState = "pressed";
  } else if (mouseSobreBtnSig) {
    btnSigState = "hover";
  }
  drawStyledButton(
    explicacionBtnSiguienteX,
    explicacionBtnSiguienteY,
    explicacionBtnSiguienteW,
    explicacionBtnSiguienteH,
    "SIGUIENTE >",
    btnSigState,
    0.4,
    'monospace'
  );
}

/////////////////////////////////////////////////////////////////////////////////////
// ------------------------- Función avanzarExplicación -----------------------------
/////////////////////////////////////////////////////////////////////////////////////
function avanzarExplicacion() {
  if (pantallaActual !== "explicacion") return;

  elementoObjetivoMoldes = {
    x: explicacionBtnSiguienteX + explicacionBtnSiguienteW / 2,
    y: explicacionBtnSiguienteY + explicacionBtnSiguienteH / 2,
    w: explicacionBtnSiguienteW,
    h: explicacionBtnSiguienteH,
    type: 'ui_button'
  };

  // Si era un video, pausar y ocultar
  if (
    indiceExplicacionActual >= 0 &&
    indiceExplicacionActual < contenidoExplicaciones.length &&
    contenidoExplicaciones[indiceExplicacionActual].tipo === "video" &&
    miVideo &&
    videoCargado
  ) {
    if (typeof miVideo.pause === 'function') miVideo.pause();
    if (typeof miVideo.hide === 'function') miVideo.hide();
  }

  if (indiceExplicacionActual === contenidoExplicaciones.length - 1) {
    navegarA("navegacion_jerarquica");
  } else {
    indiceExplicacionActual++;
    // Si el siguiente es video, reiniciar y reproducir
    if (
      indiceExplicacionActual >= 0 &&
      indiceExplicacionActual < contenidoExplicaciones.length &&
      contenidoExplicaciones[indiceExplicacionActual].tipo === "video" &&
      miVideo &&
      videoCargado
    ) {
      if (miVideo.elt && miVideo.elt.readyState >= 2 && typeof miVideo.currentTime === 'number') {
        try {
          miVideo.currentTime(0);
        } catch (e) {
          console.error("Error al reiniciar video:", e);
        }
      }
      if (miVideo.elt && miVideo.elt.readyState >= 2) {
        miVideo.loop ? miVideo.loop() : miVideo.play();
      }
      if (typeof miVideo.style === 'function') {
        miVideo.style('display', 'none');
      }
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////////
// -------------------------------- Pantalla About -----------------------------------
/////////////////////////////////////////////////////////////////////////////////////
function drawPantallaAboutMarca() {
  let cajaPadding = 40;
  let cajaW = min(width * 0.85, 700);
  let cajaH = min(height * 0.75, 550);
  let cajaX = (width - cajaW) / 2;
  let cajaY = (height - cajaH) / 2;

  push();
  fill(red(colorFondoBosque), green(colorFondoBosque), blue(colorFondoBosque), 240);
  stroke(btnColBordeNormal);
  strokeWeight(2);
  rect(cajaX, cajaY, cajaW, cajaH, btnCornerRadius);

  fill(btnColTextoNormal);
  textSize(constrain(cajaW / 18, 24, 38));
  textAlign(CENTER, TOP);
  text(contenidoAboutMarca.titulo, cajaX + cajaW / 2, cajaY + cajaPadding);

  fill(lerpColor(btnColTextoNormal, color(255), 0.3));
  textSize(constrain(cajaW / 35, 14, 18));
  textAlign(LEFT, TOP);
  textLeading(textSize() * 1.5);
  text(
    contenidoAboutMarca.parrafo,
    cajaX + cajaPadding,
    cajaY + cajaPadding + 60,
    cajaW - 2 * cajaPadding,
    cajaH - 2 * cajaPadding - 60
  );
  pop();
}

/////////////////////////////////////////////////////////////////////////////////////
// ----------------------------- Menú Hamburguesa ------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
function drawMenuHamburguesa() {
  menuHamburguesaIconX = width - MARGEN_LATERAL_ATRAS - menuHamburguesaIconW - 15;
  menuHamburguesaIconY = ALTURA_ICONOS_SUPERIORES;
  let lineaH = menuHamburguesaIconH / 7;

  push();
  noStroke();
  fill(btnColTextoNormal);

  if (menuHamburguesaAbierto) {
    // Dibujar ícono “X”
    let xIconSize = menuHamburguesaIconW * 0.9;
    let xIconStroke = lineaH * 2.5;
    let xIconX = width - MARGEN_LATERAL_ATRAS - xIconSize - 10;
    let xIconY = ALTURA_ICONOS_SUPERIORES + menuHamburguesaIconH / 2;

    push();
    translate(xIconX + xIconSize / 2, xIconY);
    strokeCap(ROUND);
    stroke(btnColTextoNormal);
    strokeWeight(xIconStroke);

    rotate(45);
    line(-xIconSize / 2 * 0.7, 0, xIconSize / 2 * 0.7, 0);
    rotate(90);
    line(-xIconSize / 2 * 0.7, 0, xIconSize / 2 * 0.7, 0);
    pop();
  } else {
    // Dibujar icono hamburguesa
    rect(menuHamburguesaIconX, menuHamburguesaIconY + lineaH * 0.5, menuHamburguesaIconW, lineaH, 2);
    rect(menuHamburguesaIconX, menuHamburguesaIconY + menuHamburguesaIconH / 2 - lineaH / 2, menuHamburguesaIconW, lineaH, 2);
    rect(menuHamburguesaIconX, menuHamburguesaIconY + menuHamburguesaIconH - lineaH * 1.5, menuHamburguesaIconW, lineaH, 2);
  }
  pop();

  if (menuHamburguesaAbierto) {
    push();
    fill(red(colorFondoBosque), green(colorFondoBosque), blue(colorFondoBosque), 252);
    noStroke();
    rect(0, 0, width, height);
    pop();

    let menuItemW = PANEL_MENU_ANCHO_ORIGINAL * 1.1;
    menuItemW = constrain(menuItemW, 220, width * 0.6);
    let menuItemH = 55;
    let menuItemSpacing = 25;
    let totalMenuHeight = menuItems.length * menuItemH + (menuItems.length - 1) * menuItemSpacing;
    let startY = (height - totalMenuHeight) / 2;

    for (let i = 0; i < menuItems.length; i++) {
      let item = menuItems[i];
      let itemX = (width - menuItemW) / 2;
      let itemY = startY + i * (menuItemH + menuItemSpacing);

      let state = "normal";
      if (
        currentPressedButtonInfo.type === 'menu_item' &&
        currentPressedButtonInfo.id === item.id
      ) {
        state = "pressed";
      } else if (
        mouseX >= itemX &&
        mouseX <= itemX + menuItemW &&
        mouseY >= itemY &&
        mouseY <= itemY + menuItemH
      ) {
        state = "hover";
      }
      drawStyledButton(itemX, itemY, menuItemW, menuItemH, item.label, state, 0.4, 'monospace');
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////////
// ------------------------------ eventos mouse --------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
function mousePressed() {
  // Reset de botón presionado
  currentPressedButtonInfo = { type: null, id: null, initialState: null };

  // 1) Ícono hamburguesa (si no estamos en la primera intro)
  if (
    !esPrimerInicioReal &&
    mouseX >= menuHamburguesaIconX &&
    mouseX <= menuHamburguesaIconX + menuHamburguesaIconW &&
    mouseY >= menuHamburguesaIconY &&
    mouseY <= menuHamburguesaIconY + menuHamburguesaIconH
  ) {
    currentPressedButtonInfo = { type: 'hamburger_icon', id: 'main_hamburger' };
    return;
  }

  // 2) Si el menú está abierto, chequear clics en sus items
  if (menuHamburguesaAbierto) {
    let menuItemW = PANEL_MENU_ANCHO_ORIGINAL * 0.9;
    menuItemW = constrain(menuItemW, 200, width * 0.7);
    let menuItemH = 55;
    let menuItemSpacing = 25;
    let totalMenuHeight = menuItems.length * menuItemH + (menuItems.length - 1) * menuItemSpacing;
    let startY = (height - totalMenuHeight) / 2;
    for (let i = 0; i < menuItems.length; i++) {
      let item = menuItems[i];
      let itemX = (width - menuItemW) / 2;
      let itemY = startY + i * (menuItemH + menuItemSpacing);
      if (
        mouseX >= itemX &&
        mouseX <= itemX + menuItemW &&
        mouseY >= itemY &&
        mouseY <= itemY + menuItemH
      ) {
        currentPressedButtonInfo = { type: 'menu_item', id: item.id, action: item.action };
        return;
      }
    }
    // Si clickeamos en la pantalla de inicio (pantallaActual === "inicio") y el menú está abierto,
    // automáticamente abrimos la pantalla de épocas
    if (pantallaActual === "inicio") {
      navegarA("navegacion_jerarquica");
      menuHamburguesaAbierto = false;
      return;
    }
    // Si clickeamos fuera de la ventana del menú, cerramos la función sin hacer nada
    if (
      mouseX >= 0 && mouseX <= width &&
      mouseY >= 0 && mouseY <= height
    ) {
      return;
    }
  }

  // 3) Pantalla explicación: botón “SIGUIENTE >”
  if (
    pantallaActual === "explicacion" &&
    mouseX >= explicacionBtnSiguienteX &&
    mouseX <= explicacionBtnSiguienteX + explicacionBtnSiguienteW &&
    mouseY >= explicacionBtnSiguienteY &&
    mouseY <= explicacionBtnSiguienteY + explicacionBtnSiguienteH
  ) {
    currentPressedButtonInfo = { type: 'explicacion_siguiente', id: 'btn_expl_next' };
    return;
  }

  // 4) Pantalla inicio: clic en “área inicio”
  if (
    pantallaActual === "inicio" &&
    mouseX >= botonInicioX &&
    mouseX <= botonInicioX + botonInicioAncho &&
    mouseY >= botonInicioY &&
    mouseY <= botonInicioY + botonInicioAlto
  ) {
    if (esPrimerInicioReal) {
      currentPressedButtonInfo = { type: 'inicio_texto_ascii', id: 'main_start_text' };
    } else {
      currentPressedButtonInfo = { type: 'inicio_explicacion_btn', id: 'inicio_btn_explicacion' };
    }
    return;
  }

  // 5) Botón Atrás
  if (
    pantallaActual !== 'inicio' &&
    pantallaActual !== 'explicacion' && /* Asegurarse que el botón atrás no interfiera aquí si no está visible */
    historialPantallas.length > 0 && /* Solo si hay a dónde ir atrás (y no es la primera pantalla) */
    dist(
      mouseX,
      mouseY,
      botonAtrasX + botonAtrasAncho / 2,
      botonAtrasY + botonAtrasAlto / 2
    ) < max(botonAtrasAncho / 2, botonAtrasAlto / 2) // Área de clic más generosa
  ) {
      // Verificamos que el botón atrás sea realmente visible para la pantalla actual
      if (pantallaActual === "navegacion_jerarquica" || pantallaActual === "about_marca") {
        currentPressedButtonInfo = { type: 'atras', id: 'btn_atras' };
        return;
      }
  }


  // 6) Pantalla navegación jerárquica
  if (pantallaActual === "navegacion_jerarquica") {

    // --- Si estamos en la introducción con botones grandes ---
    if (estadoPresentacionEpocas === "grandes_centrados_intro") {
      // Chequear clics en botones grandes
      for (let o = 0; o < botonesEpocaGrandesInfo.length; o++) {
        let btn = botonesEpocaGrandesInfo[o];
        if (
          mouseX >= btn.x &&
          mouseX <= btn.x + btn.w &&
          mouseY >= btn.y &&
          mouseY <= btn.y + btn.h
        ) {
          currentPressedButtonInfo = { type: 'epoca_intro', id: o };
          return;
        }
      }
      // No consideramos nada más hasta que se haga click
      return;
    }

    // --- Si ya estamos en "barra_superior" ---
    // 6.a) Chequear clics en botones Año (Part)
    if (botonesAnoEspecificoInfo && epocaSeleccionadaId !== -1 && subTemaSeleccionadoId !== -1) {
      for (let o = 0; o < botonesAnoEspecificoInfo.length; o++) {
        let t = botonesAnoEspecificoInfo[o];
        if (!t) continue;
        if (
          mouseX >= t.x &&
          mouseX <= t.x + t.w &&
          mouseY >= t.y &&
          mouseY <= t.y + t.h
        ) {
          currentPressedButtonInfo = { type: 'part', id: o };
          return;
        }
      }
    }

    // 6.b) Chequear clics en subtemas
    if (epocaSeleccionadaId !== -1) {
      for (let o = 0; o < NOMBRES_SUB_BOTONES.length; o++) {
        let bY = yInicioColumnasVerticales + o * (botonSubTemaAlto + espacioVerticalBotonesSubTema);
        if (
          mouseX >= xColumnaSubTemas &&
          mouseX <= xColumnaSubTemas + botonSubTemaAncho &&
          mouseY >= bY &&
          mouseY <= bY + botonSubTemaAlto
        ) {
          currentPressedButtonInfo = { type: 'tema', id: o };
          return;
        }
      }
    }

    // 6.c) Chequear clics en la barra de épocas (botones reducidos)
    for (let o = 0; o < textosBotonesEpocas.length; o++) {
      let btnI = botonesEpocaPequeñosInfo[o];
      if (!btnI) continue;
      if (
        mouseX >= btnI.x &&
        mouseX <= btnI.x + btnI.w &&
        mouseY >= btnI.y &&
        mouseY <= btnI.y + btnI.h
      ) {
        currentPressedButtonInfo = { type: 'epoca', id: o, initialState: estadoPresentacionEpocas };
        return;
      }
    }

    // 6.d) Si la caja de contenido está abierta, clic fuera la cierra
    if (
      mostrarContenidoCaja &&
      pantallaActual === "navegacion_jerarquica"
    ) {
      let cajaX = xColumnaAnosEspecificos;
      if (botonesAnoEspecificoInfo.length > 0) {
        cajaX = xColumnaAnosEspecificos + botonAnoEspecificoAncho + ANCHO_COLUMNA_OFFSET;
      } else if (
        subBotonesInfo.length > 0 &&
        subTemaSeleccionadoId !== -1 &&
        subBotonesInfo.find(b => b.id === subTemaSeleccionadoId)
      ) {
        cajaX = xColumnaSubTemas + botonSubTemaAncho + ANCHO_COLUMNA_OFFSET;
      } else {
        cajaX = xColumnaSubTemas + ANCHO_COLUMNA_OFFSET;
      }

      let cajaY = yInicioColumnasVerticales - 20;
      if (cajaY < yBarraEpocas + botonEpocaAltoOriginal + 10) {
        cajaY = yBarraEpocas + botonEpocaAltoOriginal + 10;
      }

      let anC = max(350, width - cajaX - 20);
      let cajaH = height - cajaY - 20;

      if (!(
        mouseX >= cajaX && mouseX <= cajaX + anC &&
        mouseY >= cajaY && mouseY <= cajaY + cajaH
      ) && !currentPressedButtonInfo.type) { // Asegurarse que no se esté presionando otro botón
        // No hacemos nada en mousePressed, la acción de cerrar se maneja en mouseReleased
      }
    }
  }
}


function mouseReleased() {
  let clickedInfo = currentPressedButtonInfo;
  currentPressedButtonInfo = { type: null, id: null, initialState: null }; // Resetear siempre

  // 1) Ícono hamburguesa
  if (clickedInfo.type === 'hamburger_icon' &&
      mouseX >= menuHamburguesaIconX && // Verificar que el release fue sobre el ícono
      mouseX <= menuHamburguesaIconX + menuHamburguesaIconW &&
      mouseY >= menuHamburguesaIconY &&
      mouseY <= menuHamburguesaIconY + menuHamburguesaIconH) {
    menuHamburguesaAbierto = !menuHamburguesaAbierto;
    elementoObjetivoMoldes = null;
    if (menuHamburguesaAbierto) { // Si se abre el menú, pausar video de explicación si estaba
        if (pantallaActual === "explicacion" && miVideo && videoCargado) {
            miVideo.pause();
        }
        pararOcultarVideoContenidoCaja(); // También parar video de contenido si estaba
    } else { // Si se cierra el menú y estábamos en explicación con video, reanudarlo
        if (pantallaActual === "explicacion" &&
            indiceExplicacionActual >= 0 &&
            indiceExplicacionActual < contenidoExplicaciones.length &&
            contenidoExplicaciones[indiceExplicacionActual].tipo === "video" &&
            miVideo && videoCargado) {
            if (miVideo.elt && miVideo.elt.readyState >= 2) miVideo.loop ? miVideo.loop() : miVideo.play();
        }
    }
    return;
  }

  // 2) Item de menú
  if (clickedInfo.type === 'menu_item') {
    let menuItemW = PANEL_MENU_ANCHO_ORIGINAL * 0.9;
    menuItemW = constrain(menuItemW, 200, width * 0.7);
    let menuItemH = 55;
    let menuItemSpacing = 25;
    let totalMenuHeight = menuItems.length * menuItemH + (menuItems.length - 1) * menuItemSpacing;
    let startY = (height - totalMenuHeight) / 2;
    let item = menuItems.find(m => m.id === clickedInfo.id);
    if(item){
        let itemIndex = menuItems.indexOf(item);
        let itemX = (width - menuItemW) / 2;
        let itemY = startY + itemIndex * (menuItemH + menuItemSpacing);
        if (mouseX >= itemX && mouseX <= itemX + menuItemW && mouseY >= itemY && mouseY <= itemY + menuItemH) { // Verificar release sobre el item
            menuHamburguesaAbierto = false;
            elementoObjetivoMoldes = null;
            switch (clickedInfo.action) {
              case 'ir_explicacion':
                navegarA("explicacion");
                esPrimerInicioReal = false; // Ya no es el primer inicio
                indiceExplicacionActual = 0; // Siempre empezar desde la primera explicación
                break;
              case 'ir_epocas':
                navegarA("navegacion_jerarquica");
                // estadoPresentacionEpocas se maneja en navegarA para "navegacion_jerarquica"
                break;
              case 'abrir_spotify':
                window.open(SPOTIFY_PLAYLIST_URL, '_blank');
                break;
              case 'ver_about_marca':
                navegarA("about_marca");
                break;
            }
        }
    }
    return;
  }

  // Si el menú estaba abierto y se hizo clic/release fuera de un item, se cierra el menú.
  if (menuHamburguesaAbierto && !clickedInfo.type) { // Si no se clickeó un ítem específico del menú
      menuHamburguesaAbierto = false;
      // Reanudar video de explicación si es el caso y si no se navegó a otro lado
      if (pantallaActual === "explicacion" &&
          indiceExplicacionActual >= 0 &&
          indiceExplicacionActual < contenidoExplicaciones.length &&
          contenidoExplicaciones[indiceExplicacionActual].tipo === "video" &&
          miVideo && videoCargado) {
          if (miVideo.elt && miVideo.elt.readyState >= 2) miVideo.loop ? miVideo.loop() : miVideo.play();
      }
      return; // Importante para no procesar otros clics si solo se cerró el menú
  }


  // 3) Botón “SIGUIENTE >” de explicación
  if (clickedInfo.type === 'explicacion_siguiente' &&
      mouseX >= explicacionBtnSiguienteX && // Verificar release sobre el botón
      mouseX <= explicacionBtnSiguienteX + explicacionBtnSiguienteW &&
      mouseY >= explicacionBtnSiguienteY &&
      mouseY <= explicacionBtnSiguienteY + explicacionBtnSiguienteH) {
    avanzarExplicacion();
    return;
  }

  // 4) Pantalla inicio: clic en área de texto ASCII o botón Explicación
  if (
    (clickedInfo.type === 'inicio_texto_ascii' || clickedInfo.type === 'inicio_explicacion_btn') &&
    mouseX >= botonInicioX && // Verificar release sobre el botón/área
    mouseX <= botonInicioX + botonInicioAncho &&
    mouseY >= botonInicioY &&
    mouseY <= botonInicioY + botonInicioAlto
  ) {
    let tempObjetivoX = (clickedInfo.type === 'inicio_texto_ascii')
      ? width / 2
      : botonInicioX + botonInicioAncho / 2;
    let tempObjetivoY = (clickedInfo.type === 'inicio_texto_ascii')
      ? height / 2
      : botonInicioY + botonInicioAlto / 2;

    elementoObjetivoMoldes = {
      x: tempObjetivoX,
      y: tempObjetivoY,
      w: botonInicioAncho,
      h: botonInicioAlto,
      type: clickedInfo.type
    };

    pararOcultarVideoContenidoCaja();
    navegarA("explicacion");
    // esPrimerInicioReal y indiceExplicacionActual se manejan en navegarA
    if (clickedInfo.type === 'inicio_texto_ascii') {
      moldsEnFaseDeAparicion = true;
      numMoldsVisibles = 0;
    }
    return;
  }

  // 5) Botón “Atrás”
  if (clickedInfo.type === 'atras' &&
      (pantallaActual === "navegacion_jerarquica" || pantallaActual === "about_marca" || pantallaActual === "explicacion") && // Solo si el botón es relevante
      mouseX >= botonAtrasX && // Verificar release sobre el botón
      mouseX <= botonAtrasX + botonAtrasAncho &&
      mouseY >= botonAtrasY &&
      mouseY <= botonAtrasY + botonAtrasAlto
    ) {
        if (historialPantallas.length > 0) {
            let pantallaPrevia = historialPantallas.pop();
            // Lógica especial si volvemos a navegación jerárquica desde explicación
            if (pantallaPrevia === "navegacion_jerarquica" && pantallaActual === "explicacion" && estadoPresentacionEpocas === "grandes_centrados_intro") {
                // No hacer nada especial, navegarA("navegacion_jerarquica") lo reseteará a intro.
            }
            navegarA(pantallaPrevia);
        } else {
            navegarA("inicio"); // Fallback si no hay historial
        }
        return;
    }


  // 6) Pantalla navegación jerárquica:
  if (pantallaActual === "navegacion_jerarquica") {

    // 6.a) Si estamos en la introducción con botones grandes
    if (estadoPresentacionEpocas === "grandes_centrados_intro" && clickedInfo.type === 'epoca_intro') {
      let i = clickedInfo.id;
      let btn = botonesEpocaGrandesInfo[i];
      if (btn && mouseX >= btn.x && mouseX <= btn.x + btn.w && mouseY >= btn.y && mouseY <= btn.y + btn.h) { // Verificar release
        estadoPresentacionEpocas = "barra_superior";
        epocaSeleccionadaId = i;
        subTemaSeleccionadoId = -1;
        anoEspecificoSeleccionadoId = -1;
        mostrarContenidoCaja = false;
        pararOcultarVideoContenidoCaja();
        actualizarColoresMoldPorEpoca(epocaSeleccionadaId);
        let btnI = botonesEpocaPequeñosInfo[i];
        if (btnI) {
          elementoObjetivoMoldes = {
            x: btnI.x + btnI.w / 2,
            y: btnI.y + btnI.h / 2,
            w: btnI.w,
            h: btnI.h,
            type: 'epoch_button_' + textosBotonesEpocas[i]
          };
        }
      }
      return;
    }

    // 6.b) Si ya estamos en "barra_superior":

    // Época click
    if (clickedInfo.type === 'epoca') {
      let i = clickedInfo.id;
      let btnI = botonesEpocaPequeñosInfo[i];
      if (btnI && mouseX >= btnI.x && mouseX <= btnI.x + btnI.w && mouseY >= btnI.y && mouseY <= btnI.y + btnI.h) { // Verificar release
        if (epocaSeleccionadaId === i) {
          epocaSeleccionadaId = -1;
          subTemaSeleccionadoId = -1;
          anoEspecificoSeleccionadoId = -1;
          mostrarContenidoCaja = false;
          pararOcultarVideoContenidoCaja();
          actualizarColoresMoldPorEpoca(-1);
          elementoObjetivoMoldes = null;
        } else {
          epocaSeleccionadaId = i;
          subTemaSeleccionadoId = -1;
          anoEspecificoSeleccionadoId = -1;
          mostrarContenidoCaja = false;
          pararOcultarVideoContenidoCaja();
          actualizarColoresMoldPorEpoca(epocaSeleccionadaId);
          if (btnI) {
            elementoObjetivoMoldes = {
              x: btnI.x + btnI.w / 2,
              y: btnI.y + btnI.h / 2,
              w: btnI.w,
              h: btnI.h,
              type: 'epoch_button_' + textosBotonesEpocas[i]
            };
          }
        }
      }
      return;
    }

    // Subtema click
    if (clickedInfo.type === 'tema') {
      let o = clickedInfo.id;
      let bY = yInicioColumnasVerticales + o * (botonSubTemaAlto + espacioVerticalBotonesSubTema);
      if (mouseX >= xColumnaSubTemas && mouseX <= xColumnaSubTemas + botonSubTemaAncho && mouseY >= bY && mouseY <= bY + botonSubTemaAlto) { // Verificar release
        elementoObjetivoMoldes = {
          x: xColumnaSubTemas + botonSubTemaAncho / 2,
          y: bY + botonSubTemaAlto / 2,
          w: botonSubTemaAncho,
          h: botonSubTemaAlto,
          type: 'theme_source'
        };
        if (subTemaSeleccionadoId !== o) {
          subTemaSeleccionadoId = o;
          anoEspecificoSeleccionadoId = -1;
          if (mostrarContenidoCaja) pararOcultarVideoContenidoCaja();
          mostrarContenidoCaja = false;
          puntosDeInteresAdicionales = [];
        } else { // Si se clickea el mismo subtema, no cerrar la caja de contenido si está abierta para una "part"
            // No hacer nada, permitir que el usuario seleccione una "part" o cierre la caja explícitamente
        }
      }
      return;
    }

    // Parte (Año específico) click
    if (clickedInfo.type === 'part') {
      let o = clickedInfo.id;
      let t = botonesAnoEspecificoInfo.find(btn => btn.id === o);
      if (t && mouseX >= t.x && mouseX <= t.x + t.w && mouseY >= t.y && mouseY <= t.y + t.h) { // Verificar release
        elementoObjetivoMoldes = {
          x: t.x + t.w / 2,
          y: t.y + t.h / 2,
          w: t.w,
          h: t.h,
          type: 'part_button'
        };
        if (anoEspecificoSeleccionadoId === t.id && mostrarContenidoCaja) {
          mostrarContenidoCaja = false;
          pararOcultarVideoContenidoCaja();
          // anoEspecificoSeleccionadoId = -1; // Opcional: deseleccionar la part
        } else {
          anoEspecificoSeleccionadoId = t.id;
          if (
            contenidoPorAnoEspecifico &&
            epocaSeleccionadaId !== -1 && subTemaSeleccionadoId !== -1 && // Asegurar que época y tema estén seleccionados
            contenidoPorAnoEspecifico[epocaSeleccionadaId] &&
            contenidoPorAnoEspecifico[epocaSeleccionadaId][subTemaSeleccionadoId] &&
            contenidoPorAnoEspecifico[epocaSeleccionadaId][subTemaSeleccionadoId][anoEspecificoSeleccionadoId]
          ) {
            let contentData = contenidoPorAnoEspecifico[epocaSeleccionadaId][subTemaSeleccionadoId][anoEspecificoSeleccionadoId];
            tituloContenidoActual = contentData.titulo;
            descripcionContenidoActual = contentData.descripcion;
            urlVideoContenidoActual = contentData.urlVideo;
            cargarVideoContenidoCaja();
            mostrarContenidoCaja = true;
          } else {
            mostrarContenidoCaja = false; // No hay contenido válido que mostrar
            pararOcultarVideoContenidoCaja();
          }
        }
      }
      return;
    }

    // Clic fuera de la caja de contenido para cerrarla
    if (
      mostrarContenidoCaja &&
      !clickedInfo.type // Asegura que el clic no fue en un botón que ya manejó la acción
    ) {
        let cajaX = xColumnaAnosEspecificos;
        if (botonesAnoEspecificoInfo.length > 0) {
          cajaX = xColumnaAnosEspecificos + botonAnoEspecificoAncho + ANCHO_COLUMNA_OFFSET;
        } else if (
          subBotonesInfo.length > 0 &&
          subTemaSeleccionadoId !== -1 &&
          subBotonesInfo.find(b => b.id === subTemaSeleccionadoId)
        ) {
          cajaX = xColumnaSubTemas + botonSubTemaAncho + ANCHO_COLUMNA_OFFSET;
        } else {
          cajaX = xColumnaSubTemas + ANCHO_COLUMNA_OFFSET;
        }

        let cajaY = yInicioColumnasVerticales - 20;
        if (cajaY < yBarraEpocas + botonEpocaAltoOriginal + 10) {
            cajaY = yBarraEpocas + botonEpocaAltoOriginal + 10;
        }
        let anC = max(350, width - cajaX - 20);
        let cajaH = height - cajaY - 20;

        // Verificar si el clic fue FUERA de la caja de contenido
        if (!(mouseX >= cajaX && mouseX <= cajaX + anC && mouseY >= cajaY && mouseY <= cajaY + cajaH)) {
            mostrarContenidoCaja = false;
            pararOcultarVideoContenidoCaja();
            // anoEspecificoSeleccionadoId = -1; // Opcional: deseleccionar también la "part"
        }
        return; // Importante para que no se procesen otros clics
    }
  }
}


/////////////////////////////////////////////////////////////////////////////////////
// ------------------------------ windowResized() -----------------------------------
/////////////////////////////////////////////////////////////////////////////////////
function windowResized() {
  if (windowWidth > 0 && windowHeight > 0) {
    resizeCanvas(windowWidth, windowHeight);
    if (typeof pixelDensity === 'function') {
      pixelDensity(1);
      d = pixelDensity();
    } else {
      d = 1;
    }
    // Recalcular posiciones de barra superior y botones grandes
    yBarraEpocas = ALTURA_ICONOS_SUPERIORES + 25;
    yInicioColumnasVerticales = yBarraEpocas + botonEpocaAltoOriginal + 30;
    gfxMuroConcreto = null;
    gfxGrietas = null;
    necesitaRedibujarGrietas = true;
    grietasMuro = [];

    if (width > 0 && height > 0) {
      // Recalcular botones pequeños (barra superior)
      let anTB = textosBotonesEpocas.length * botonEpocaAnchoOriginal +
                   (textosBotonesEpocas.length - 1) * espacioHorizontalBotonesEpoca;
      let xIB = (width - anTB) / 2;
      for (let i = 0; i < textosBotonesEpocas.length; i++) {
        botonesEpocaPequeñosInfo[i] = {
          x: xIB + i * (botonEpocaAnchoOriginal + espacioHorizontalBotonesEpoca),
          y: yBarraEpocas,
          w: botonEpocaAnchoOriginal,
          h: botonEpocaAltoOriginal
        };
      }
      // Recalcular botones grandes (centrados), asegurando que entren
      const n = textosBotonesEpocas.length;
      const totalSpacing = (n - 1) * espacioHorizontalBotonesEpoca;
      let maxGW = width * 0.18;
      let fitGW = (width - totalSpacing) / n;
      let gW = min(maxGW, fitGW);
      let gH = gW * (botonEpocaAltoOriginal / botonEpocaAnchoOriginal);
      let totalWidth = n * gW + totalSpacing;
      let xIG = (width - totalWidth) / 2;
      let yG = height / 2 - gH / 2;
      for (let i = 0; i < textosBotonesEpocas.length; i++) {
        botonesEpocaGrandesInfo[i] = {
          x: xIG + i * (gW + espacioHorizontalBotonesEpoca),
          y: yG,
          w: gW,
          h: gH
        };
      }
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////////
// -------------------------------- keyPressed() ------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
function keyPressed() {
  if (key === "s" || key === "S") {
    if (molds && molds.length > 0 && molds[0]) { // Asegurarse que molds existe y tiene elementos
      let estadoActual = molds[0].stop;
      for (let o of molds) {
        if (o) o.stop = !estadoActual; // Verificar que 'o' no sea null/undefined
      }
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////////
// ---------------------------- Video Contenido Caja ---------------------------------
/////////////////////////////////////////////////////////////////////////////////////
function cargarVideoContenidoCaja() {
  if (videoContenidoCaja) {
    videoContenidoCaja.remove();
    videoContenidoCaja = null;
  }
  videoContenidoCajaCargado = false;
  if (urlVideoContenidoActual && urlVideoContenidoActual !== "") {
    videoContenidoCaja = createVideo(urlVideoContenidoActual, () => {
      videoContenidoCajaCargado = true;
      if (videoContenidoCaja) {
        videoContenidoCaja.hide();
        videoContenidoCaja.volume(1);
        if (mostrarContenidoCaja && pantallaActual === "navegacion_jerarquica") {
          if (videoContenidoCaja.elt && videoContenidoCaja.elt.readyState >= 2) { // HTMLMediaElement readyState: HAVE_CURRENT_DATA o más
          if (typeof videoContenidoCaja.loop === 'function') {
  videoContenidoCaja.loop();
} else {
  videoContenidoCaja.play(1);
}

          }
        }
      }
    });
    if (videoContenidoCaja) { // Asegurar que createVideo no falló
      videoContenidoCaja.hide();
      videoContenidoCaja.attribute('playsinline', ''); // Para iOS y navegadores que lo requieran para reproducción inline
    }
  } // ← cerrar el “if (urlVideoContenidoActual…”
} // ← cerrar la función cargarVideoContenidoCaja

function pararOcultarVideoContenidoCaja() {
  if (videoContenidoCaja) {
    if (videoContenidoCajaCargado && typeof videoContenidoCaja.pause === 'function') {
      try { videoContenidoCaja.pause(); } catch(e) { console.warn("Advertencia al pausar video de contenido:", e); }
    }
    if (typeof videoContenidoCaja.hide === 'function') {
      videoContenidoCaja.hide();
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////////
// -------------------------------- navegarA() ---------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
function navegarA(nuevaPantalla) {
  let pantallaAnterior = pantallaActual;
  if (pantallaActual !== nuevaPantalla) {
    if(pantallaActual !== "inicio" || !esPrimerInicioReal) { // No agregar "inicio" inicial al historial
        historialPantallas.push(pantallaActual);
    }
    necesitaBorradoLimpio = true;
  }
  pantallaActual = nuevaPantalla;

  // Si dejamos la explicación, pausar video
  if (pantallaAnterior === "explicacion" && nuevaPantalla !== "explicacion") {
    if (miVideo && videoCargado) {
      try { miVideo.pause(); } catch(e) { console.warn("Advertencia al pausar video de explicación:", e); }
      miVideo.hide();
    }
  }

  // Si dejamos la navegación jerárquica y había caja abierta, ocultarla
  if (pantallaAnterior === "navegacion_jerarquica" && mostrarContenidoCaja && nuevaPantalla !== "navegacion_jerarquica") {
    pararOcultarVideoContenidoCaja();
    mostrarContenidoCaja = false; // Asegurarse que se cierra
  }


  if (pantallaActual === "about_marca") {
    // no se requiere nada adicional
  }
  else if (pantallaActual === "explicacion") {
    esPrimerInicioReal = false; // Una vez en explicación, ya no es el primer inicio
    if (indiceExplicacionActual < 0 || indiceExplicacionActual >= contenidoExplicaciones.length) {
      indiceExplicacionActual = 0;
    }
    // Asegurar que el video de explicación se reproduzca si es la diapositiva actual
    if (contenidoExplicaciones.length > 0 &&
        contenidoExplicaciones[indiceExplicacionActual].tipo === "video" &&
        miVideo && videoCargado) {
      if (miVideo.elt && miVideo.elt.readyState >= 2) {
         miVideo.loop ? miVideo.loop() : miVideo.play();
      }
      if (typeof miVideo.style === 'function') { // p5.MediaElement usa .style()
        miVideo.style('display', 'none'); // Ocultar el elemento DOM si se dibuja en canvas
      } else if (miVideo.hide) { // Otros elementos p5 pueden usar .hide()
        miVideo.hide();
      }
    }
    if (grietasMuro.length === 0) { // Para que se regeneren si es la primera vez
        necesitaRedibujarGrietas = true;
    }
  }
  else if (pantallaActual === "navegacion_jerarquica") {
     esPrimerInicioReal = false; // Entrar a navegación también cuenta como no ser el primer inicio
    // Cuando entramos a épocas desde el menú O desde la última explicación,
    // o si se vuelve desde "about_marca" y la última pantalla fue "inicio"
    // el estado debe ser "grandes_centrados_intro"
    if (pantallaAnterior === "explicacion" ||
        (pantallaAnterior === "about_marca" && historialPantallas.length > 0 && historialPantallas[historialPantallas.length -1] === "inicio") ||
        (pantallaAnterior === "inicio" && !esPrimerInicioReal) // Si venimos de "inicio" (no el primerísimo)
       ) {
      estadoPresentacionEpocas = "grandes_centrados_intro";
    } else if (estadoPresentacionEpocas !== "barra_superior") { // Si no es ninguno de los anteriores y no está ya en barra, poner intro
        estadoPresentacionEpocas = "grandes_centrados_intro";
    }
    // No resetear selecciones si ya estábamos en "barra_superior" y volvemos (ej. desde about)
    // a menos que vengamos de "inicio" o "explicación"
    if (pantallaAnterior === "explicacion" || (pantallaAnterior === "inicio" && !esPrimerInicioReal)) {
        epocaSeleccionadaId = -1;
        subTemaSeleccionadoId = -1;
        anoEspecificoSeleccionadoId = -1;
        mostrarContenidoCaja = false;
        actualizarColoresMoldPorEpoca(-1);
    }

  }
  else if (pantallaActual === "inicio") {
    // No resetear esPrimerInicioReal aquí, se maneja al pasar a explicación o navegación
    epocaSeleccionadaId = -1;
    subTemaSeleccionadoId = -1;
    anoEspecificoSeleccionadoId = -1;
    mostrarContenidoCaja = false;
    pararOcultarVideoContenidoCaja();
    if (miVideo && videoCargado) { // Pausar video de explicación si volvemos a inicio
      try { miVideo.pause(); } catch(e) { console.warn("Advertencia al pausar video de explicación (navegando a inicio):", e); }
      miVideo.hide();
    }
    if (typeof actualizarColoresMoldPorEpoca === 'function') {
      actualizarColoresMoldPorEpoca(-1);
    }
    // Si volvemos a inicio desde cualquier pantalla que no sea la primera vez,
    // esPrimerInicioReal debe ser false para mostrar el botón "EXPLICACIÓN"
    if (historialPantallas.length > 0 || pantallaAnterior !== "inicio") {
        esPrimerInicioReal = false;
    }
  }


  if (
    pantallaActual !== "navegacion_jerarquica"
  ) {
    puntosDeInteresAdicionales = [];
  }
  if (
    pantallaActual !== "explicacion" &&
    !(elementoObjetivoMoldes && elementoObjetivoMoldes.type && elementoObjetivoMoldes.type.startsWith('epoch_button')) &&
    !(elementoObjetivoMoldes && elementoObjetivoMoldes.type && elementoObjetivoMoldes.type === 'theme_source') &&
    !(elementoObjetivoMoldes && elementoObjetivoMoldes.type && elementoObjetivoMoldes.type === 'part_button')
  ) {
    elementoObjetivoMoldes = null;
  }
}


/////////////////////////////////////////////////////////////////////////////////////
// -------------------------------- Clase Grieta -------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
class Grieta {
  constructor(x, y, mX, mY) {
    this.segmentos = [createVector(x, y)];
    this.direccionActual = random(360);
    this.longitudSegmento = random(3, 7);
    this.amplitudGiro = random(15, 45);
    this.probabilidadRecto = 0.7;
    this.colorGrieta = colorGrieta; // Usar la variable global
    this.grosor = random(0.5, 2.5);
    this.maxX = mX;
    this.maxY = mY;
    this.maxSegmentos = random(80, 200);
    this.puedeCrecer = true;
  }

  crecer() {
    if (!this.puedeCrecer || this.segmentos.length >= this.maxSegmentos) {
      this.puedeCrecer = false;
      return false;
    }
    let ultimo = this.segmentos[this.segmentos.length - 1];
    if (random(1) > this.probabilidadRecto) {
      this.direccionActual += random(-this.amplitudGiro, this.amplitudGiro);
    }
    let nX = ultimo.x + cos(this.direccionActual) * this.longitudSegmento;
    let nY = ultimo.y + sin(this.direccionActual) * this.longitudSegmento;
    if (nX < 0 || nX > this.maxX || nY < 0 || nY > this.maxY) {
      this.puedeCrecer = false;
      return false;
    }
    this.segmentos.push(createVector(nX, nY));
    return true;
  }

  dibujar(pg) {
    if (this.segmentos.length < 2) return;
    pg.stroke(this.colorGrieta); // Usar la variable global de color
    pg.strokeWeight(this.grosor);
    pg.noFill();
    pg.beginShape();
    for (let p of this.segmentos) {
      pg.vertex(p.x, p.y);
    }
    pg.endShape();
  }
}