// Disjoint set data structure in javascript
{
    class DisJointSets {
        store = new Map();

        create(val){
            this.store.set(val,new Set([val]))
            return this.store;
        }

        union(a, b){
            let keyA, keyB;
            // find a & b and fetch their host keys
            for(let key of this.store.keys()){
                if(this.store.get(key).has(a)) keyA = key;
                if(this.store.get(key).has(b)) keyB = key;
            }

            if(!keyA || !keyB || keyA === keyB) return null;

            // create new set containing items from both sets
            this.store.set(keyA, new Set([...this.store.get(keyA), ... this.store.get(keyB)]));

            // delete keyB (no need to delete keyA since we have updated it)
            this.store.delete(keyB);
            return this.store;
        }

        checkSet(a, b){
             // check if both items exists in same set
            for(let key of this.store.keys()){
                let set = this.store.get(key);
                if(set.has(a) && set.has(b)){
                    return true; 
                }
            }
            return false;
        }
    }

     // fetch edges from graph (BFS)
    function fetchEdges(graph){
        // using map to avoid cycles
        let visited = new Set(), edges = new Map(), queue = [], resultEdges = [];
        let v = graph.keys().next().value;
        queue.push(v);

        while(queue.length){
            let vertex = queue.shift();
            visited.add(vertex);
            for(let neighbour of graph.get(vertex)){
                if(!visited.has(neighbour.vertex)){
                    edges.set(`${vertex}_${neighbour.vertex}`, neighbour.weight);
                    queue.push(neighbour.vertex)
                }
            }
        }
        for(let key of edges.keys()){
            resultEdges.push({edge : key, weight : edges.get(key)});
        }
        return resultEdges;
    }   
     
    // Kruskal's algorithm Minimum Spanning Tree Graph Algorithm
    function krushkalMST(graph){
        let dset = new DisJointSets(), edges = null, resultEdges = [];

        // fetch edges
        edges = fetchEdges(graph);
        // sort edges in ascending order
        edges = edges.sort((a,b) => a.weight - b.weight);
        // create sets for all vertices
        for(let key of graph.keys()){
            dset.create(key);
        }

        // visit all edges while union them if vertices of edge from diff set
        for(let e of edges){
            let start = e.edge.split('_')[0];
            let end = e.edge.split('_')[1];
            // if not in same set then consider
            if(!dset.checkSet(start, end)){
                resultEdges.push(e);
                dset.union(start, end);
            }
        }
        return resultEdges;
    }


    // weighted undirected graph
    let g = new Map();

    g.set('A',[
        { vertex : 'B', weight : 3},
        { vertex : 'D', weight : 1}
    ]);

    g.set('B',[
        { vertex : 'A', weight : 3},
        { vertex : 'D', weight : 3},
        { vertex : 'C', weight : 1},
    ]);

    g.set('C',[
        { vertex : 'D', weight : 1},
        { vertex : 'B', weight : 1},
        { vertex : 'E', weight : 5},
        { vertex : 'F', weight : 4}
    ]);

    g.set('D',[
        { vertex : 'A', weight : 1},
        { vertex : 'B', weight : 3},
        { vertex : 'C', weight : 1},
        { vertex : 'E', weight : 6},
    ]);

    g.set('E',[
        { vertex : 'D', weight : 6},
        { vertex : 'C', weight : 5},
        { vertex : 'F', weight : 2},
    ]);

    g.set('F',[
        { vertex : 'E', weight : 2},
        { vertex : 'C', weight : 4}
    ]);


    krushkalMST(g);
}
