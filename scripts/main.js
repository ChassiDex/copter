function init(){
  pages = document.getElementById('content').getElementsByTagName('div')  ;
  location.href = "/#start";
  goto();
}
function goto(){
  url = new URL(window.location.href);
  hash = url.hash.slice(1);
  for(i=0;i<pages.length;i++){
    pages[i].style.display = "none";
  }
  document.getElementById(hash).style.display = 'grid';
}
function analysePasteSeq(){
  inseq = seqinput.value;
  inseq = inseq.toUpperCase()
  seq = ''
  for(var i=0;i<inseq.length;i++){
    b = inseq[i];
    if(b!='\n'){
      seq+=b;
    }
  }
  seqtype = '';
  seqradio = document.getElementsByName('seqtype');
  for(var i = 0; i < 3; i++){
    if(seqradio[i].checked){
      seqtype = seqradio[i].value;
    }
  }
  if(seqtype=='dna'){
    seq = translate(seq);
  }
  if(seqtype=='rna'){
    seq = rna2dna(seq);
    seq = translate(seq);
  }
  location.href = "/#intapp";
  runintapp(seq);
}
function runintapp(prot){

  aas = [];
  for(var i=0;i<prot.length;i++){
    var aa = {}
    aa.name = prot[i];
    aa.codons = back[prot[i]];
    aa.active = aa.codons[0];
    aas.push(aa);
  }

  intapp = new Vue({
    el: '#intapp',
    data : {
      aas: aas,
      tables: tables,
      org_i: 0,
      avoid: [],
      avoidentry: '',
      unfixed: 0
    },
    computed : {
      freqs: function () {
        return tables[this.org_i]
      },
      dnaseq: function () {
        seq = '';
        for(var i=0;i<this.aas.length;i++){
          seq = seq + this.aas[i].active;
        }
        return seq;
      },
    },
    methods: {
      optimize: function(event){
        for(var i=0;i<this.aas.length;i++){
          this.aas[i].active = bestCodon(this.aas[i].name,this.org_i);
        }
      },
      download: function(event){
        alert(this.dnaseq)
      },
      addavoid: function () {
        this.avoid.push(this.avoidentry.toUpperCase());
        this.avoidentry = '';
      },
      removeavoid: function(t){
        this.avoid.splice(t,1);
      }
    },
    watch: {
      avoid: function(newlist,oldlist){
        aans = search(this.dnaseq,newlist);
        for(var i=0;i<this.aas.length;i++){
          this.aas[i]['isAvoid'] = false;
        }
        for(var i=0;i<aans.length;i++){
          this.aas[aans[i]]['isAvoid'] = true;
        }
        var un = 0;
        for(var i=0;i<this.aas.length;i++){
          if(this.aas[i].isAvoid){
            un++;
          }
        }
        this.unfixed = un;
      },
      dnaseq: function(newseq,oldseq){
        aans = search(newseq,this.avoid);
        for(var i=0;i<this.aas.length;i++){
          this.aas[i]['isAvoid'] = false;
        }
        for(var i=0;i<aans.length;i++){
          this.aas[aans[i]]['isAvoid'] = true;
        }
        var un = 0;
        for(var i=0;i<this.aas.length;i++){
          if(this.aas[i].isAvoid){
            un++;
          }
        }
        this.unfixed = un;
      }
    }
  });
}

function bestCodon(aa,oi){
  dcs = back[aa];
  bc = dcs[0];
  for(var i=0;i<dcs.length;i++){
    if(tables[oi][dcs[i]]>tables[oi][bc]){
      bc = dcs[i];
    }
  }
  return bc
}
function orgname(name){
  p = name[0].toUpperCase();
  for(var i=1;i<name.length;i++){
    if(name[i]=='_'){
      p += ' ';
    }
    else{
      p += name[i];
    }
  }
  return p;
}
function search(target,queries){
  indices = [];
  for(var k=0;k<queries.length;k++){
    query = queries[k];
    index = target.indexOf(query,0);
    while(index>-1){
      start = Math.floor(index/3);
      end = Math.floor((index+query.length-1)/3);
      for(var i=start;i<=end;i++){
        indices.push(i)
      }
      index = target.indexOf(query,index+1)
    }
  }
  return indices
}
