class Algorithms {
  static async selectionsort(sample) {
    for (let i = 0; i < sample.nums; ++i) {
      for (let j = i + 1; j < sample.nums; ++j) {
        if (!sample.compare(i, j)) {
          await sample.swap(i, j);
        }
      }
    }
  }

  static async bubblesort(sample) {
    for (let i = 0; i < sample.nums; ++i) {
      for (let j = 1; j < sample.nums - i; ++j) {
        if (sample.compare(j, j - 1)) {
          await sample.swap(j, j - 1);
        }
      }
    }
  }

  static async insertionsort(sample) {
    for (let i = 1; i < sample.nums; ++i) {
      let key = sample.obj[i].key
      let clone = []
      clone[i] = sample.obj[i]
      let j = i - 1
      while(j >= 0 && sample.obj[j].key > key){
        sample.comparisons++
        await sample.swap(j, j + 1)
        j--
      }
      await sample.assignNode(j + 1, clone, i)
      
    }
  }
  static async mergesort(sample, begin, end) {
    if (begin < end) {
      let mid = parseInt(begin + (end - begin) / 2);

      await Algorithms.mergesort(sample, begin, mid);
      await Algorithms.mergesort(sample, mid + 1, end);

      let L = sample.getClone(begin, mid);
      let R = sample.getClone(mid + 1, end);
      let i1 = 0,
        i2 = 0,
        p = begin;
      while (i1 < L.nums || i2 < R.nums) {
        if (i2 == R.nums || (i1 < L.nums && L.obj[i1].key < R.obj[i2].key)) {
          sample.comparisons++
          await sample.assignNode(p, L.obj, i1);
          p++, i1++;
        } else {
          sample.comparisons++
          await sample.assignNode(p, R.obj, i2);
          p++, i2++;
        }
      }
    }
  }

  static async partition(sample, begin, end) {
    let p = begin - 1;
    for (let i = begin; i < end; ++i) {
      if (sample.compare(i, end)) {
        await sample.swap(++p, i);
      }
    }
    await sample.swap(++p, end);
    return p;
  }
  static async quicksort(sample, begin, end) {
    if (begin < end) {
      let p = await this.partition(sample, begin, end);

      await this.quicksort(sample, begin, p - 1);
      await this.quicksort(sample, p + 1, end);
    }
  }

  static async combsort(sample) {
    let n = sample.nums;
    let gap = parseInt(n / 2);
    let k = 2;
    let sorted = false;
    while (!sorted) {
      gap = parseInt(gap / k);
      if (gap <= 1) {
        gap = 1;
        sorted = true;
      }
      for (let i = 0; i + gap < n; ++i) {
        if (!sample.compare(i, i + gap)) {
          await sample.swap(i, i + gap);
          sorted = false;
        }
      }
    }
  }
  static async countingSort(sample) {
    let n = sample.nums;
    let ans = new ObjSet(n, visType);
    let k = Math.max(...(sample.obj.map(node => node.key)))
    let map = new Array(k + 1).fill(0);

    for (let i = 0; i < n; ++i) {
      ans.obj[i].key = sample.obj[i].key;
      map[sample.obj[i].key]++;
    }
    for (let i = 1; i < k + 1; ++i) {
      map[i] += map[i - 1];
    }
    
    for (let i = 0; i < n; ++i) {
      await sample.assignNode(map[ans.obj[i].key] - 1, ans.obj, i);
      map[ans.obj[i].key] -= 1
    }
  }

  static async radixSort(sample){
    let n = sample.nums;
    let clone = sample.getClone(0, n - 1)
    let max = Math.max(...(sample.obj.map(node => node.key)))
    max = max.toString().length
    
    for(let place = 1 ; place <= max ; ++place)
    {
      let map = new Array(11).fill(0)

      // counting sort digitwise
      for(let i = 0 ; i < n ; ++i){
        let digit = getIthDigit(clone.obj[i].key, place)
        map[digit + 1]++
      }

      for(let i = 1; i < map.length ; ++i){
        map[i] += map[i-1]
      }

      for(let i = 0 ; i < n ; ++i){
        let digit = getIthDigit(clone.obj[i].key, place)
        
        // do not counting sort from last place
        // instead start from begining at end of last one
        let index = map[digit]
        sample.assignNode(index, clone.obj, i)
        await sample.draw(sample.ctx)
        map[digit]++
      }


      for (let i = 0 ; i < n ; ++i){
        clone.obj[i] = sample.obj[i]
      }
    }
  }


  static async cyclicSort(sample){
      let n = sample.nums
      for(let i = 0 ; i < n ; ++i){
        while(i != sample.obj[i].key - 1){
          await sample.swap(i, sample.obj[i].key - 1)
        }
      }
  }
}

function getIthDigit(num, place){
  for(let j = 1 ; j < place ; ++j){
    num = Math.floor(num/10)
  }
  return num%10
}
