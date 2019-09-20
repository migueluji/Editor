class DisplayActor extends PIXI.Container {

    constructor(actor,texture,guizmo) {
        super();

        var tilingSprite;
        if (texture) {
            tilingSprite = new PIXI.TilingSprite(texture, texture.width, texture.height);
            tilingSprite.width=tilingSprite.texture.width*actor.tileX;
            tilingSprite.height=tilingSprite.texture.height*actor.tileY;
            tilingSprite.anchor.set(0.5);
            this.addChild(tilingSprite);
        }

        if (guizmo) this.displayGuizmo(tilingSprite.width,tilingSprite.height);
        this.width=actor.width;
        this.height=actor.height;
        this.angle=-actor.rotation;
        
    }

    displayGuizmo(width,height){
   
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(1, 0xDDDDDD, 1, 0, true);
        graphics.drawRect(-width/2.0,-height/2.0,width,height);
        this.addChild(graphics);
    }

}