class Visualizer{
    static async prepareCanvas(){
        ctx.canvas.height = window.innerHeight
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        let begin = 60, size = 15
        this.writeText(ctx, "Comparisons : " + sample.comparisons, 10, begin, size)
        this.writeText(ctx, "Swapping : " + sample.swaps, 10, begin + size, size)
    }

    static async writeText(ctx, text, x, y, size){
        ctx.beginPath()
        ctx.font = size + "px Arial";
        ctx.fillStyle = "#a0d2eb"
        ctx.strokeStyle = "orange"
        ctx.fillText(text, x, y);
        ctx.fill()
        ctx.stroke()
    }

    static async barVisualizer(ctx, sample){   
        await this.prepareCanvas()
        
        let hUnit = ctx.canvas.height / sample.nums
        let wUnit = ctx.canvas.width / sample.nums
        for(let i = 0 ; i < sample.nums ; ++i){
            ctx.beginPath()
            ctx.fillStyle = "#a0d2eb"
            ctx.strokeStyle = sample.obj[i].color
            ctx.lineWidth = 3
            ctx.rect(
                i * wUnit,
                ctx.canvas.height - sample.obj[i].key * hUnit,
                wUnit,
                hUnit * sample.obj[i].key
                )
                ctx.fill()
                ctx.stroke()
                
            }
        await new Promise(resolve => setTimeout(resolve, 5/sample.nums));
    }

    static async pointVisualizer(ctx, sample){
        await this.prepareCanvas()
        
        let radius = ctx.canvas.height / sample.nums / 2 
        let hUnit = (ctx.canvas.height - radius) / sample.nums
        let wUnit = ctx.canvas.width /sample.nums
        for(let i = 0 ; i < sample.nums ; ++i){
            ctx.beginPath()
            ctx.fillStyle = "#a0d2eb"
            ctx.strokeStyle = sample.obj[i].color
            ctx.lineWidth = 3
            ctx.arc(
                radius + i * (wUnit),
                radius/2 + ctx.canvas.height - sample.obj[i].key * hUnit,
                radius,
                0,
                2 * Math.PI
                )
                ctx.fill()
                ctx.stroke()
            }
        await new Promise(resolve => setTimeout(resolve, 5/sample.nums));
    }
    static async pointVisualizer(ctx, sample){
        await this.prepareCanvas()

        let radius = ctx.canvas.height / sample.nums / 2 
        let hUnit = (ctx.canvas.height) / sample.nums
        let wUnit = (ctx.canvas.width + 2 * radius) /sample.nums
        for(let i = 0 ; i < sample.nums ; ++i){
            ctx.beginPath()
            ctx.fillStyle = "#a0d2eb"
            ctx.strokeStyle = sample.obj[i].color
            ctx.lineWidth = 3
            ctx.arc(
                radius +  wUnit * i,
                ctx.canvas.height - sample.obj[i].key * hUnit + radius,
                radius,
                0,
                2 * Math.PI
                )
                ctx.fill()
                ctx.stroke()
            }
        await new Promise(resolve => setTimeout(resolve, 5/sample.nums));
    }
    static async coloredTriangleVisualizer(ctx, sample){
        await this.prepareCanvas()
        
        ctx.save()
        ctx.translate(ctx.canvas.width/ 2, ctx.canvas.height/2)

        ctx.lineWidth = 1
        let radius = (canvas.height - 30 )/ 2

        for(let i = 1 ; i < sample.nums ; ++i){
            let angle1 = lerp(0, Math.PI * 2, (i - 1)/(sample.nums - 1))
            let angle2 = lerp(0, Math.PI * 2, i/(sample.nums - 1))

            ctx.fillStyle = getHSL(lerp(0, 360, sample.obj[i].key/sample.nums))
            ctx.strokeStyle = sample.obj[i].color
            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(Math.cos(angle1) * radius , Math.sin(angle1) * radius)
            ctx.lineTo(Math.cos(angle2) * radius , Math.sin(angle2) * radius)
            ctx.fill()
            ctx.stroke()

        }
        ctx.fill()
        ctx.restore()
        await new Promise(resolve => setTimeout(resolve, 2/sample.nums));
    }
    

}
function lerp(A, B, t){
    return A + (B - A) * t
}
function getHSL(x){
    return "hsl(" + x + ",100%,50%)"
}
