table = {}

table['AAA'] = 'K';
table['AAC'] = 'N';
table['AAG'] = 'K';
table['AAT'] = 'N';

table['ACA'] = 'T';
table['ACC'] = 'T';
table['ACG'] = 'T';
table['ACT'] = 'T';

table['AGA'] = 'R';
table['AGC'] = 'S';
table['AGG'] = 'R';
table['AGT'] = 'S';

table['ATA'] = 'I';
table['ATC'] = 'I';
table['ATG'] = 'M';
table['ATT'] = 'I';

table['CAA'] = 'Q';
table['CAC'] = 'H';
table['CAG'] = 'Q';
table['CAT'] = 'H';

table['CCA'] = 'P';
table['CCC'] = 'P';
table['CCG'] = 'P';
table['CCT'] = 'P';

table['CGC'] = 'R';
table['CGA'] = 'R';
table['CGG'] = 'R';
table['CGT'] = 'R';

table['CTA'] = 'L';
table['CTC'] = 'L';
table['CTG'] = 'L';
table['CTT'] = 'L';

table['GAA'] = 'E';
table['GAC'] = 'D';
table['GAG'] = 'E';
table['GAT'] = 'D';

table['GCA'] = 'A';
table['GCC'] = 'A';
table['GCT'] = 'A';
table['GCG'] = 'A';

table['GGA'] = 'G';
table['GGC'] = 'G';
table['GGG'] = 'G';
table['GGT'] = 'G';

table['GTA'] = 'V';
table['GTC'] = 'V';
table['GTG'] = 'V';
table['GTT'] = 'V';

table['TAA'] = '*';
table['TAC'] = 'Y';
table['TAG'] = '*';
table['TAT'] = 'Y';

table['TCA'] = 'S';
table['TCC'] = 'S';
table['TCG'] = 'S';
table['TCT'] = 'S';

table['TGA'] = '*';
table['TGC'] = 'C';
table['TGG'] = 'W';
table['TGT'] = 'C';

table['TTA'] = 'L';
table['TTC'] = 'F';
table['TTG'] = 'L';
table['TTT'] = 'F';

function translate(dna){
  prot = ''
  for(var i=0;i<dna.length;i+=3){
    codon = dna.slice(i,i+3);
    prot += table[codon];
  }
  return prot
}
function rna2dna(rna){
  dna = ''
  for(var i=0;i<rna.length;i++){
    if(rna[i]=='U'){
      dna+='T';
    }
    else{
      dna+=rna[i];
    }
  }
  return dna
}
