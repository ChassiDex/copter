from Bio import SeqIO
import os

b = ['A','C','G','T']
codons = [ b[i]+b[j]+b[k] for i in range(4) for j in range(4) for k in range(4) ]

def codoncount(folder):
    count = {}
    for c in codons:
        count[c] = 0
    n = 0
    chromosomes = ['genomes/'+folder+'/'+i for i in os.listdir('genomes/'+folder)]
    for file in chromosomes:
        for record in SeqIO.parse(file,"fasta"):
            seq = str(record.seq)
            for i in range(0,3*(len(seq)//3),3):
                codon = seq[i:i+3]
                if(codon in codons):
                    count[seq[i:i+3]] += 1
                    n += 1
    for c in codons:
        count[c] = round(100*count[c]/n,2)
    return count

genomes = os.listdir('genomes')
genomes.sort()
data = []
for g in genomes:
    org = {}
    org['name'] = g
    count = codoncount(g)
    for c in codons:
        org[c] = count[c]
    data.append(org)

print('tables = new Array('+ str(len(data)) +');')
for i in range(len(data)):
    print('tables['+str(i)+'] = {};')
    print('tables['+str(i)+'].name = \''+data[i]['name']+'\';')
    for c in codons:
        print('tables['+str(i)+'].' + c + ' = ' + str(data[i][c]) + ';')
    print('\n')
