class ObjSet{
    constructor(nums, type = "bar"){
        this.nums = nums
        this.obj = []
        this.visType = type
        this.swaps = 0
        this.comparisons = 0
        for(let i = 0 ; i < nums; ++i){
            this.obj.push(new Object(i + 1, i + 1))
        }
    }

    randomise(){
        for(let i = 0 ; i < nums ; ++i){
            let rand = Math.ceil(Math.random() * (nums - 1))
            let  temp = this.obj[i] 
            this.obj[i] = this.obj[rand]
            this.obj[rand] = temp
        }    
    }

    compare(i, j){
        this.comparisons++
        return (this.obj[i].key < this.obj[j].key)
    }

    getClone(begin, end){
        let clone = new ObjSet(0, this.visType);
        for (let i = begin ; i <= end ; ++i){
            clone.obj.push(new Object(this.obj[i].key, this.obj[i].val))
            clone.nums++
        }
        return clone
    }

    async draw(ctx = this.ctx){
        this.ctx = ctx
        switch(this.visType){
            case "bar":
                await Visualizer.barVisualizer(ctx, this)
                break
            case "point":
                await Visualizer.pointVisualizer(ctx, this)
                break
            case "coloredTri":
                await Visualizer.coloredTriangleVisualizer(ctx, this)
                break
        }
    }

    async sort(type){
        this.comparisons = 0
        this.swaps = 0
        switch(type){
            case 'merge':
                await Algorithms.mergesort(this, 0, this.nums - 1)
                break
            case "quick":
                await Algorithms.quicksort(this, 0, this.nums - 1)
                break
            case "selection":
                await Algorithms.selectionsort(this)
                break
            case "bubble":
                await Algorithms.bubblesort(this)
                break
            case "insertion":
                await Algorithms.insertionsort(this)
                break
            case "comb":
                await Algorithms.combsort(this)
                break
            case "counting":
                await Algorithms.countingSort(this)
                break
            case "radix":
                await Algorithms.radixSort(this)
                break
            case "cyclic":
                await Algorithms.cyclicSort(this)
                break
        }
        this.issorted = await this.check()
    }

    async swap(i, j){
        await this.recolor(i, j, "red")
        
        let temp = this.obj[i]
        this.obj[i] = this.obj[j]
        this.obj[j] = temp

        await this.recolor(i, j, "green")
        
        await this.recolor(i, j, "#e5eaf5")

        this.swaps++
    }

    async assignNode(i, arr ,j){
        await this.recolor(i, j, "red")
        
        this.obj[i] = arr[j]

        await this.recolor(i, j, "green")
        
        await this.recolor(i, j, "#e5eaf5")
    }

    async recolor(i, j, clr){
        this.obj[j].color = clr
        this.obj[i].color = clr
        await this.draw(this.ctx, this.visType)
    }

    async check(){
        for(let i = 0 ; i < this.nums - 1 ; ++i){
            if(this.obj[i].key < this.obj[i + 1].key){
                await this.recolor(i, i + 1, "green")
                await this.recolor(i, i + 1, "#e5eaf5")
            }
            else{
                await this.recolor(i, i + 1, "red")
                return false
            }
        }
        return true
    }

}
class Object{
    constructor(key, val, color = "#e5eaf5") {
        this.key = key
        this.val = val
        this.color = color
    }
}