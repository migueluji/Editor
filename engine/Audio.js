class Audio {

    constructor(engine) {

        this.engine     = engine;   /** */
        this.actorList  = [];       /** */

        this.sound      = null;     /** */
    }

    setActorAudio(actor, data) {
        
        /** Comprobamos que el actor tiene un sonido. */
        if(data.soundOn) {
            /** Creamos el objeto de audio. */
            this.createSound({source: data.sound, play: true, volume: data.volume, pan: data.pan, loop: data.loop}, false);
            /** Añadimos el actor a la lista del motor de audio */
            this.actorList.push(actor);
        }
    }

    destroyActor(actor) {

        this.actorList = Util.removeByID(this.actorList, actor.ID); /** Eliminamos el actor de la lista de actores del motor de audio. */
    }

    setSound(sound, play, volume, pan, loop) {

        this.sound = this.createSound({source: sound, play: play, volume: volume, pan: pan, loop: loop}, false);
    }

    play() {

        if(this.playSound) { this.sound.play(); }
    }

    createSound(sound, destroy) {

        return new Howl({  
           //src: [_player.file.source + "/sounds/" + sound.source],
            src: [serverGamesFolder+"/"+gameFolder+"/sounds/" + sound.source],
                autoplay: sound.play,
                loop: sound.loop || false,
                volume: sound.volume,
                stereo: sound.pan,
                format: sound.source.split(".")[1],
                onend: function() {
                    if(destroy) { this.unload(); }
                }
        });
    }

    sleep(actor) {

        // TODO
    }

    awake(actor) {

        // TODO
    }

    /** ###############################################################################
     *  Elementos auxiliares para la ejecucion de las expresiones logicas 
     *  ############################################################################### */
    PlaySound(soundFile, play, volume, pan) {

        var s=  this.createSound({source: soundFile, play: play, volume: volume, pan: pan}, true);
        s.play(); // Miguel
    }
}