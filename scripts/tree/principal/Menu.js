/* global game */

var Technotip = {};

Technotip.Menu = function (game) {
  let numeroAle;
  let numeroAle2;
  let estrella;
  let sustraerLetraInicial;
  let palabra;
  var lienzo2;
  let letraPrecionada;
  let contadorImagenes;
};

Technotip.Menu.prototype = {
  init: function (datosLink) {
    this.puntos = 0;
    contador = 0;

    /*Usado para selecciona la vocal*/
    arregloImagen = ["escuela", "casa", "granja", "bosque", "sol"];
    arregloPosX = [340, 380, 840, 530, 270];
    arregloPosY = [610, 390, 600, 140, 140];
    posx = 0;
    posy = 650;
    posx2 = 342;
    this.estrella;
    numeroSeleccionado = [];
    contadorImagenes = 0;
    contadorVueltas = 0;
    activarWhile = true;
    activarFinal = false;
    palabrasSeleccionadas = [];
    arregloZona = [];
  },
  preload: function () {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    /*Cargar sonidos de muy bien*/
    game.load.audio('instruccion','audio/instrucciones.mp3')
    // game.load.audio('sonMalo','audio/intenta_otra_vez.mp3')
    game.load.audio("muybien", "audio/muy bien.mp3");
    game.load.audio("felicidades", "audio/felicidades.mp3");
    /*Cargar las imagenes de bueno*/
    game.load.image("bocina", "img/bocina.png");
    game.load.image("comenzar", "img/cartas-31.png");
    game.load.image("zona", "img/recursos.png");
    game.load.image("fondo", "img/fondo.png");
    game.load.image("laberinto", "img/laberinto.png");
    game.load.image("carro", "img/carro.png");
    game.load.image("escuela", "img/escuela.png");
    game.load.image("granja", "img/granja.png");
    game.load.image("casa", "img/casa.png");
    game.load.image("bosque", "img/bosque.png");
    game.load.image("sol", "img/sol.png");
    game.load.atlasJSONHash("caritas", "img/caritas.png", "img/caritas.json");
  },
  create: function () {
    this.instruccionesFx = this.add.audio("instruccion", 1, false);
    this.muybienFX = this.add.audio("muybien", 1, false);
    this.sonFelicidadesFX = this.add.audio("felicidades", 1, false);
    /*Color del fondo*/
    this.game.stage.backgroundColor = "#ffffff";
    /*Codigo para el fondo*/
    fondo = game.add.sprite(0, 0, "fondo");
    this.generaFondo(fondo);
    /*Se colocan las instrucciones y el icono de la bocina*/
    intrucciones = game.add.text(
      275,
      -95,
      "Con las teclas de dirección lleva al carro al destino que se indica.",
      {
        fontSize: "26px",
        fill: "#404040",
      }
    );
    iconoBocina = game.add.image(200, 5, "bocina");
    iconoBocina.inputEnabled = true;
    iconoBocina.input.useHandCursor = true;
    iconoBocina.events.onInputOver.add(over, this);
    iconoBocina.events.onInputOut.add(out, this);
    iconoBocina.scale.setTo(0.7);
    iconoBocina.events.onInputDown.add(this.clickIconoBocina, this);
    game.add
      .tween(intrucciones)
      .to({ y: 15 }, 2000, Phaser.Easing.Bounce.Out, true);

    laberinto = game.add.sprite(650, 400, "laberinto");
    laberinto.anchor.setTo(0.5);
    laberinto.scale.setTo(1, 1);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
    activarFlechas = false;
    group = game.add.physicsGroup();
    group2 = game.add.physicsGroup();

    imgCarro = game.add.sprite(660, 485, "carro");
    imgCarro.anchor.setTo(0.5, 0.5);
    imgCarro.scale.setTo(0.04);
    game.physics.arcade.enable(imgCarro);
    imgCarro.body.collideWorldBounds = true;
    activarFlechas = true;

    zona = game.add.sprite(180, 130, "zona"); //primera
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.5, 1);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);
    zona = game.add.sprite(300, 130, "zona"); //segunda
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.04, 1);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);
    zona = game.add.sprite(435, 130, "zona"); //tercera
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.65, 1);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(585, 199.12, "zona"); //cuarta
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.4, 0.36);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(585, 80, "zona"); //cuarta
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.4, 0.36);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(801, 173.2, "zona"); //quinta
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.9, 0.6);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(801, 40, "zona"); //quinta
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.9, 0.2);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(1079, 130, "zona"); //sexta
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.9, 1);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(165, 372, "zona"); //septima
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.45, 0.86);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);
    zona = game.add.sprite(395, 328.8, "zona"); //OCTAVA
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(1, 0.46);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(605, 372, "zona"); //NOVENA
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.28, 0.86);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);
    zona = game.add.sprite(735, 372, "zona"); //DECIMA
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.35, 0.86);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);
    zona = game.add.sprite(875, 327.72, "zona"); //ONCE
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.3, 0.45);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(1079, 372, "zona"); //DOCE
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.9, 0.86);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(371, 445.44, "zona"); //TRECE
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(1.2, 0.18);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(479, 400, "zona"); //CATORCE
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.3, 0.18);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(330, 553, "zona"); //QUINCE
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(1.2, 0.4);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(330, 690, "zona"); //QUINCE
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(1.6, 0.4);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(585, 553, "zona"); //DIEZSISEIS
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.45, 0.4);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(585, 690, "zona"); //DIEZSISEIS
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.45, 0.8);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(851, 445.44, "zona"); //decima
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.5, 0.18);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(760, 553, "zona"); //DIEZOI
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.55, 0.4);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(760, 690, "zona"); //DIEZOI
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.55, 0.8);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);
    zona = game.add.sprite(900, 553, "zona"); //DIEZOI
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.15, 0.4);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(900, 690, "zona"); //DIEZOI
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.15, 0.8);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(1079, 553, "zona"); //DIEZOI
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.9, 0.4);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(1079, 690, "zona"); //DIEZOI
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.9, 0.8);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(180, 260, "zona"); //Cerrar
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.15, 0.15);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(330, 40, "zona"); //Cerrar
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.15, 0.15);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(270, 120, "zona"); //Cerrar
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.15, 0.15);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(345, 620, "zona"); //Cerrar
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.15, 0.15);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(855, 590, "zona"); //Cerrar
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.15, 0.15);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(660, 40, "zona"); //Cerrar
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.15, 0.15);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(940, 40, "zona"); //Cerrar
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.15, 0.15);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(1130, 485, "zona"); //Cerrar
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.15, 0.15);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(1130, 255, "zona"); //Cerrar
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.15, 0.15);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    zona = game.add.sprite(940, 755, "zona"); //Cerrar
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.15, 0.15);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);
    zona = game.add.sprite(660, 755, "zona"); //Cerrar
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.15, 0.15);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);
    zona = game.add.sprite(180, 490, "zona"); //Cerrar
    zona.anchor.setTo(0.5, 0.5);
    zona.scale.setTo(0.15, 0.15);
    zona.alpha = 0;
    game.physics.arcade.enable(zona);
    zona.body.immovable = true;
    group2.add(zona);

    var i, j, k, l, m;
    for (i = arregloImagen.length; i; i--) {
      j = Math.floor(Math.random() * i);

      k = arregloImagen[i - 1];
      l = arregloPosX[i - 1];
      m = arregloPosY[i - 1];

      arregloImagen[i - 1] = arregloImagen[j];
      arregloPosX[i - 1] = arregloPosX[j];
      arregloPosY[i - 1] = arregloPosY[j];

      arregloImagen[j] = k;
      arregloPosX[j] = l;
      arregloPosY[j] = m;
    }

    this.colocarImagen();

    // imgImagen = game.add.sprite(380, 390, "casa");
    // imgImagen.anchor.setTo(0.5, 0.5);
    // imgImagen.scale.setTo(1);
    // game.physics.arcade.enable(imgImagen);
    // imgImagen.body.immovable = true;
    // group.add(imgImagen);

    // imgImagen = game.add.sprite(840, 600, "granja");
    // imgImagen.anchor.setTo(0.5, 0.5);
    // imgImagen.scale.setTo(1);
    // game.physics.arcade.enable(imgImagen);
    // imgImagen.body.immovable = true;
    // group.add(imgImagen);

    // imgImagen = game.add.sprite(530, 140, "bosque");
    // imgImagen.anchor.setTo(0.5, 0.5);
    // imgImagen.scale.setTo(1);
    // game.physics.arcade.enable(imgImagen);
    // imgImagen.body.immovable = true;
    // group.add(imgImagen);

    // imgImagen = game.add.sprite(270, 140, "sol");
    // imgImagen.anchor.setTo(0.5, 0.5);
    // imgImagen.scale.setTo(1);
    // game.physics.arcade.enable(imgImagen);
    // imgImagen.body.immovable = true;
    // group.add(imgImagen);

    function over(imagen) {
      imagen.scale.setTo(0.75, 0.75);
      //console.log(imagen.frameName+' | valor: '+imagen.valor);
      this.estoySobre = imagen;
    }
    function out(imagen) {
      //console.log(imagen.frameName);
      imagen.scale.setTo(0.7, 0.7);
      // this.estoySobre=null;
    }
    // grupoZonas = game.add.group()
    // grupo = game.add.group()
    // activadorCronometro=false
    // this.colocarImagen()
  },

  /*Funcion para que cuando se le de clic a ala bocina suene las instrucciones*/
  clickIconoBocina: function () {
    this.instruccionesFx.play();
  },
  /*Metodo update*/
  update: function () {
    imgCarro.body.velocity.x = 0;
    imgCarro.body.velocity.y = 0;

    if (cursors.left.isDown) {
      imgCarro.body.velocity.x = -200;
    } else if (cursors.right.isDown) {
      imgCarro.body.velocity.x = 200;
    }

    if (cursors.up.isDown) {
      imgCarro.body.velocity.y = -200;
    } else if (cursors.down.isDown) {
      imgCarro.body.velocity.y = 200;
    }

    game.physics.arcade.collide(
      imgCarro,
      group,
      this.collisionHandler,
      this.processHandler,
      this
    );
    game.physics.arcade.collide(imgCarro, group2);
    if (activarFinal) {
      contador += 1;
      if (contador == 80) {
        activarFinal = false;
        contadorImagenes += 1;
        contador = 1;
        this.colocarImagen();
      }
    }
  },
  render: function () {},
  /*Funciones adicionales*/
  numeroAleatorio: function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },
  generaFondo: function (imagen) {
    //imagen = game.add.sprite(0,0,'fondo');
    imagen.height = game.height;
    imagen.width = game.width;
    imagen.anchor.x = 0.5;
    imagen.anchor.y = 0.5;
    imagen.x = game.width * 0.5;
    imagen.y = game.height * 0.5;
  },
  numeroAleatorio3: function (de) {
    return Math.floor(Math.random() * de);
  },
  colocarImagen: function () {
    imgImagen = game.add.sprite(
      arregloPosX[contadorImagenes],
      arregloPosY[contadorImagenes],
      arregloImagen[contadorImagenes]
    );
    imgImagen.anchor.setTo(0.5, 0.5);
    imgImagen.scale.setTo(1);
    game.physics.arcade.enable(imgImagen);
    imgImagen.body.immovable = true;
    group.add(imgImagen);
  },
  collisionHandler: function (player, veg) {
    veg.body.enable = false;
    veg.alpha=0.7
    if (contadorImagenes == 4) {
      this.notedesanimes2();
    } else {
      this.notedesanimes();
      activarFinal = true;
    }
  },
  processHandler: function (player, veg) {
    return true;
  },

  notedesanimes: function () {
    var delay = 200;
    let arreglo = [
      "CS_correcta_1",
      "CS_correcta_2",
      "CS_correcta_3",
      "CS_correcta_4",
      "CS_correcta_5",
      "CS_correcta_6",
    ];

    estrella = game.add.sprite(
      game.width * 0.5,
      game.height * 0.5,
      "caritas",
      arreglo[this.numeroAleatorio3(5)]
    );
    this.ajustaImagen2(estrella);
    estrella.scale.setTo(0, 0);
    estrella.x = game.width * 0.5;
    estrella.y = game.height * 0.5;

    var miTween = game.add
      .tween(estrella.scale)
      .to({ x: 2, y: 2 }, 1000, Phaser.Easing.Bounce.Out, true, delay);
    miTween.onStart.add(borraIcono, this);
    miTween.onComplete.add(borraIcono2, this);
    function borraIcono() {
      this.muybienFX.play();
    }
    function borraIcono2() {
      estrella.kill();
    }

    // setTimeout(this.termianr, 5000);
  },

  notedesanimes2: function () {
    var delay = 200;
    let arreglo = [
      "CS_correcta_1",
      "CS_correcta_2",
      "CS_correcta_3",
      "CS_correcta_4",
      "CS_correcta_5",
      "CS_correcta_6",
    ];

    estrella = game.add.sprite(
      game.width * 0.5,
      game.height * 0.5,
      "caritas",
      arreglo[this.numeroAleatorio3(5)]
    );
    this.ajustaImagen2(estrella);
    estrella.scale.setTo(0, 0);
    estrella.x = game.width * 0.5;
    estrella.y = game.height * 0.5;

    var miTween = game.add
      .tween(estrella.scale)
      .to({ x: 2, y: 2 }, 1000, Phaser.Easing.Bounce.Out, true, delay);
    miTween.onStart.add(borraIcono, this);
    // miTween.onComplete.add(borraIcono2, this);
    function borraIcono() {
      this.sonFelicidadesFX.play();
    }

    setTimeout(this.termianr, 5000);
  },
  onStart: function () {
    this.muybienFX.play();
  },
  onStart2: function () {
    this.sonMaloFX.play();
  },
  termianr: function () {
    game.state.start("Menu");
  },
  ajustaImagen: function (imagen) {
    imagen.scale.setTo(1, 1);
    imagen.anchor.setTo(0.5, 0.5); // anchor x y;
  },
  ajustaImagen2: function (imagen) {
    imagen.width = imagen.width * 3;
    imagen.heiht = imagen.height * 3;
    imagen.scale.setTo(1, 1);
    imagen.anchor.setTo(0.5, 0.5); // anchor x y;
  },
  ajustaImagen3: function (imagen) {
    imagen.width = imagen.width;
    imagen.heiht = imagen.height;
    imagen.scale.setTo(1, 1);
    imagen.anchor.setTo(0.5, 0.5); // anchor x y;
  },
  onClickRepetir: function () {
    this.cancelaUpdate = false;
    game.bloque = 0;
    window.location = "index.html";
  },
  onClickRegresar: function () {
    //game.bloque=1;
    //this.state.start('Menu');
    this.cancelaUpdate = false;
    this.state.start("Blue", true, false, this.datosSeccionAnterior);
  },
  onClicReiniciar: function () {
    this.cancelaUpdate = false;
    this.state.start("b1l5a2", true, false, this.datosSeccionAnterior);
  },
  onClickInicio: function () {
    this.cancelaUpdate = false;
    game.bloque = 0;
    this.state.start("Menu");
  },
};
