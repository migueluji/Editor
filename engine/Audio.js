class Audio {

    constructor(engine) {

        this.engine     = engine;   /** */
        this.actorList  = [];       /** */

        this.sound      = null;     /** */
    }

    setActorAudio(actor, data) {
        
        /** Comprobamos que el actor tiene un sonido. */
        if(data.soundOn) {

            console.log("ENTRAAAAAAAAA");
            console.log(data.sound, data.soundOn)

        

            /** Creamos el objeto de audio. */
            this.createSound({source: data.sound, play: true, volume: data.volume, pan: data.pan, loop: data.loop}, false);
        
            /** Añadimos el actor a la lista del motor de audio */
            this.actorList.push(actor);
        }
    }

    destroyActor(actor) {

        this.actorList = Util.removeByID(this.actorList, actor.ID); /** Eliminamos el actor de la lista de actores del motor de audio. */
    }

    setSound() {

        this.sound = this.createSound({source: this.soundFile, play: this.playSound, volume: this.volume, pan: this.pan, loop: this.loop}, false);
    }

    play() {

        if(this.playSound) { this.sound.play(); }
    }

    createSound(sound, destroy) {

        console.log(sound);

        return new Howl({
            src: [_player.file.source + "/sounds/" + sound.source],
            autoplay: sound.play,
            loop: sound.loop || false,
            volume: sound.volume,
            stereo: sound.pan,
            format: sound.source.split(".")[1],
            onend: function() {
                console.log(this);
                console.log('Audio track Finished!');
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

        this.createSound({source: soundFile, play: play, volume: volume, pan: pan}, true);
    }
}