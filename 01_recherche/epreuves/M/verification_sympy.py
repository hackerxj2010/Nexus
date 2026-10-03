# Vérification indépendante (passe 2) des corrigés des épreuves EP-M-S1-0001 à 0010
# (concours d'entrée aux lycées scientifiques, Togo). Usage : python3 verification_sympy.py
# Correspondance : 2020→0001, 2017→0002, 2015→0003, 2012→0004, 2011→0005, 2013→0006,
#                  2016→0007, 2018→0008, 2021→0009, 2019→0010.
# Passe 2 : résolution indépendante par calcul symbolique (sympy) des questions corrigeables.
from sympy import *
x,y,R,h,a = symbols('x y R h a', real=True)
ok=[]
def chk(nom, calc, attendu):
    if isinstance(attendu,bool) or getattr(calc,'is_Boolean',False) or isinstance(calc,bool):
        v = bool(calc) == attendu
    else:
        v = simplify(calc - attendu) == 0
    ok.append(v); print(('OK ' if v else 'ECHEC ')+nom, '=>', calc)

print('=== 2020 ===')
A_=sqrt(2)-1; B_=2-sqrt(3)
chk('a>0', A_.evalf()>0, True); chk('b>0', B_.evalf()>0, True)
chk('d(a,b)', Abs(A_-B_), sqrt(2)+sqrt(3)-3)
chk('a>b', (A_-B_).evalf()>0, True)
chk('c milieu', (A_+B_)/2, (1+sqrt(2)-sqrt(3))/2)
chk('d=2b-a', 2*B_-A_, 5-2*sqrt(3)-sqrt(2))
AB2 = (R*sqrt(2)/2)**2 + (R-R*sqrt(2)/2)**2
chk('AB^2 octogone', AB2, R**2*(2-sqrt(2)))
chk('cos22.5', cos(pi/8), sqrt(2+sqrt(2))/2); chk('cos67.5', cos(3*pi/8), sqrt(2-sqrt(2))/2)
chk('aire AOB', Rational(1,2)*R*R*sin(pi/4), R**2*sqrt(2)/4); chk('aire octogone', 8*Rational(1,2)*R*R*sin(pi/4), 2*sqrt(2)*R**2)
A=x**2-4*x+3; B=(2*x+3)**2-(x+4)**2
chk('B dev', expand(B), 3*x**2+4*x-7)
chk('A forme', x**2-2*x*2+2**2-1, A); chk('A fact', factor(A), (x-1)*(x-3)); chk('A+1', factor(A+1), (x-2)**2); chk('B fact', factor(B), (x-1)*(3*x+7))
print('sol sqrt(A+1)=3 :', solve(Eq(Abs(x-2),3),x))
pA,pB,pC=Matrix([1,4]),Matrix([-3,0]),Matrix([2,0])
M=(pB+pC)/2; N=(pA+pB)/2; G=(pA+pB+pC)/3
print('M',M.T,'N',N.T,'G',G.T)
chk('AM eq', 8*M[0]-3*M[1]+4, 0); chk('AM eq A', 8*pA[0]-3*pA[1]+4, 0)
chk('CN eq N', 2*N[0]+3*N[1]-4, 0); chk('CN eq C', 2*pC[0]+3*pC[1]-4, 0)
chk('G sur AM', 8*G[0]-3*G[1]+4, 0); chk('G sur CN', 2*G[0]+3*G[1]-4,0)

print('=== 2017 ===')
hh=lambda t:(3-2*sqrt(3))*t+7
chk('pente<0', (3-2*sqrt(3)).evalf()<0, True)
vals={'h(0)':hh(0),'h(-2)':hh(-2),'h(4/3)':hh(Rational(4,3)),'h(sqrt7)':hh(sqrt(7)),'h(-5)':hh(-5)}
print('ordre croissant :', sorted(vals, key=lambda k: vals[k].evalf()))
chk('h(-4)', hh(-4), 8*sqrt(3)-5); chk('h(sqrt3)', expand(hh(sqrt(3))), 3*sqrt(3)+1)
s=solve(Eq(hh(x),-2),x)[0]; chk('antecedent -2', s, 9+6*sqrt(3))
A=3*(x+1)**2-12; B=(2*x+3)**2-(x+4)**2
chk('A dev', expand(A), 3*x**2+6*x-9); chk('A fact', factor(A), 3*(x-1)*(x+3)); chk('B fact', factor(B),(x-1)*(3*x+7))
print('sol 3x2+6x-9=0', solve(3*x**2+6*x-9,x))
hq=(3*x+7)*(x-1)/(3*x**2+6*x-9); chk('h simplifiee', cancel(hq), (3*x+7)/(3*x+9))
print('B=[-pi;2[ inter Z', [k for k in range(-10,10) if -pi<=k<2])
Bp,Ap,Cp=Matrix([0,0]),Matrix([0,4]),Matrix([3,0])
AC=sqrt(25); chk('AC',AC,5)
t=symbols('t'); I_=Matrix([4,3])*Rational(12,25)  # projection de B sur AC : 4x+3y=12
chk('I sur AC', 4*I_[0]+3*I_[1], 12)
chk('AI', (I_-Ap).norm(), Rational(16,5)); chk('CI',(I_-Cp).norm(),Rational(9,5)); chk('BI',(I_-Bp).norm(),Rational(12,5))
D_=Matrix([3,Rational(9,4)])  # x=3 sur (BI)
chk('D sur BI', D_[1]/D_[0], Rational(3,4))
chk('ID',(D_-I_).norm(),Rational(27,20)); chk('CD',(D_-Cp).norm(),Rational(9,4))
chk('cos alpha', Rational(4,5)**2+Rational(3,5)**2, 1)
chk('aire trapeze', (4+Rational(9,4))/2*3, Rational(75,8))
E,C,G_=symbols('E C G'); 
# vecteurs : A = E + (C-E) + (G-E) = C+G-E ; I = G + (E-C)
Ev,Cv,Gv=Matrix(symbols('e1 e2')),Matrix(symbols('c1 c2')),Matrix(symbols('g1 g2'))
Av=Cv+Gv-Ev; Iv=Gv+Ev-Cv
chk('CAGE parallelogramme (CA=EG)', (Av-Cv-(Gv-Ev)).norm(), 0)
chk('G milieu de AI', ((Av+Iv)/2-Gv).norm(), 0)
A5,B5,C5=Matrix([-2,1]),Matrix([3,6]),Matrix([4,-1])
D5=A5+C5-B5; I5=(A5+C5)/2; print('D',D5.T,'I',I5.T)
chk('AC.BD', (C5-A5).dot(D5-B5), 0); chk('AB=BC', (B5-A5).norm()-(C5-B5).norm(), 0); print('AB.BC =', (B5-A5).dot(C5-B5))
E5=Matrix([0,-3]); chk('E sur BD', 3*E5[0]-E5[1]-3, 0); chk('B sur BD', 3*B5[0]-B5[1]-3,0); chk('D sur BD', 3*D5[0]-D5[1]-3,0)
chk('EA',(A5-E5).norm(),2*sqrt(5)); chk('EC',(C5-E5).norm(),2*sqrt(5)); chk('AC',(C5-A5).norm(),2*sqrt(10))
chk('Pythagore AEC', (A5-E5).norm()**2+(C5-E5).norm()**2-(C5-A5).norm()**2, 0)
F5=Matrix([2,-3]); chk('IF', (F5-I5).norm(), sqrt(10))

print('=== 2015 ===')
chk('N', Integer(10)**2*(Integer(10)**-3)**2/Integer(10)**-5, 10)
chk('25>24', 5**2-(2*sqrt(6))**2, 1)
c=symbols('c'); print('cote carre', solve(Eq(c**2-(c-2)**2,20),c))
A=(x+2)*(x-4)+(3*x-5)*(2*x+4); B=(2*x-3)**2-(x-1)**2
chk('A dev', expand(A), 7*x**2-28); chk('A fact', factor(A), 7*(x-2)*(x+2)); chk('B fact', factor(B), (x-2)*(3*x-4))
H=(3*x-4)*(x-2)/(7*(x-2)*(x+2)); chk('H simpl', cancel(H), (3*x-4)/(7*x+14))
chk('H(sqrt3)', radsimp(cancel(H).subs(x,sqrt(3))), (10*sqrt(3)-17)/7)
A3,B3,C3,D3=Matrix([-2,-3]),Matrix([-4,3]),Matrix([2,5]),Matrix([4,-1])
print('AB',(B3-A3).T,'AD',(D3-A3).T); chk('AB.AD',(B3-A3).dot(D3-A3),0); chk('AB',(B3-A3).norm(),2*sqrt(10)); chk('AD',(D3-A3).norm(),2*sqrt(10)); chk('AB=DC',(B3-A3-(C3-D3)).norm(),0)
chk('BC demi-cercle', sqrt(10**2-5**2), 5*sqrt(3)); chk('AN', Rational(35,10)/cos(pi/3), 7); chk('MN', Rational(35,10)*tan(pi/3), Rational(7,2)*sqrt(3))

print('=== 2012 ===')
E=(x-1)**2+x**2+(x+1)**2; chk('E', expand(E), 3*x**2+2); print('3x2+2=4802', solve(3*x**2+2-4802,x)); chk('somme carres', 39**2+40**2+41**2, 4802)
chk('G fact', factor(4*x**2-100), 4*(x-5)*(x+5))
A2,B2,C2=Matrix([2,-1]),Matrix([5,2]),Matrix([1,-1]); S2=2*A2-C2; R2=S2+(C2-B2); print('S',S2.T,'R',R2.T)
chk('A milieu BR', ((B2+R2)/2-A2).norm(), 0); chk('A milieu CS', ((C2+S2)/2-A2).norm(),0)
Mm=2*B2-A2; Nn=2*C2-A2; chk('MN=2BC', (Nn-Mm).norm(), 10); chk('BC', (C2-B2).norm(), 5)
chk('aire trapeze', (2*x+x)/2*3, 9*x/2); v=Rational(1,3)*9*x/2*4*x; chk('v', v, 6*x**2); chk('v(1.5)', v.subs(x,Rational(3,2)), Rational(27,2))
print('v=150', solve(Eq(v,150),x)); chk("aire IJKL", Rational(1,4)*9*x/2, 9*x/8); vp=v/8; chk("v'", vp, 3*x**2/4); chk("v'(3)", vp.subs(x,3), Rational(27,4)); chk("v'(sqrt15)", vp.subs(x,sqrt(15)), Rational(45,4))
chk('R', 3*sqrt(243)-2*sqrt(3), 25*sqrt(3))

print('=== 2011 ===')
X=3+2*sqrt(2); Y=3-2*sqrt(2)
chk('x2', expand(X**2), 17+12*sqrt(2)); chk('y2', expand(Y**2), 17-12*sqrt(2)); chk('xy', expand(X*Y), 1); chk('x/y+y/x', radsimp(X/Y+Y/X), 34)
chk('sqrt(y)', (sqrt(2)-1)**2, Y)
A=x**2+x-6; B=x**2-3*x+2
chk('P', A+B, 2*x**2-2*x-4); chk('Q', A-B, 4*x-8); chk('M', cancel(A/(x-2)), x+3); chk('N', cancel(B/(x-2)), x-1)
A4,B4,C4=Matrix([3,4]),Matrix([8,4]),Matrix([0,8]); chk('AB',(B4-A4).norm(),5); chk('AC',(C4-A4).norm(),5)
I4=(B4+C4)/2; print('I',I4.T); chk('A sur AI', 2*A4[0]-2-A4[1],0); chk('I sur AI', 2*I4[0]-2-I4[1],0); chk('AI.BC', (I4-A4).dot(C4-B4),0)
NC2=(7-x)**2+36; IN2=4+x**2; IC2=16+49
print('x tel que INC rectangle en I', solve(Eq(IN2+IC2,NC2),x))

print('=== 2013 ===')
A=(3*x+5)*(x-5)-(x**2-10*x+25)-(3*x-15); B=x**2-3*x-10
print('729 =', factorint(729)); chk('C-1', factor(x**2+54*x+729), (x+27)**2)
chk('A dev', expand(A), 2*x**2-3*x-35); chk('B(5)',B.subs(x,5),0); chk('B(-2)',B.subs(x,-2),0); chk('B fact',factor(B),(x-5)*(x+2)); chk('A fact',factor(A),(x-5)*(2*x+7))
print('B=-10', solve(Eq(B,-10),x)); print('5B=3A', solve(Eq(5*B,3*A),x))
Ee=(sqrt(3)-1)/sqrt(2); Ff=(sqrt(3)+1)/sqrt(2); chk('ExF', radsimp(Ee*Ff),1); chk('F2', radsimp(expand(Ff**2)), 2+sqrt(3)); chk('E2', radsimp(expand(Ee**2)), 2-sqrt(3))
chk('EB', 6*sin(pi/4), 3*sqrt(2)); chk('EC', 6*cos(pi/4), 3*sqrt(2)); chk('AB', 3*sqrt(2)/sin(pi/3), 2*sqrt(6)); chk('AB loi sinus', 6*sin(pi/4)/sin(pi/3), 2*sqrt(6))
# angle FIB : triangle isocele IFB avec angle B = 75°
print('FIB =', 180-2*75, '; FIE = 2*FBE =', 2*30)
A6,B6,D6=Matrix([-5,1]),Matrix([1,7]),Matrix([1,1]); C6=B6+D6-A6; M6=(A6+C6)/2; print('C',C6.T,'M',M6.T)
chk('pente AB', (B6[1]-A6[1])/(B6[0]-A6[0]), 1); chk('pente CD',(C6[1]-D6[1])/(C6[0]-D6[0]),1); chk('pente AC',(C6[1]-A6[1])/(C6[0]-A6[0]),Rational(1,2))
G6=solve([Eq(y,-2*x+3),Eq(y,x/2+Rational(7,2))],[x,y]); print('G',G6)
chk('AD',(D6-A6).norm(),6); chk('BD',(B6-D6).norm(),6); chk('BA',(A6-B6).norm(),6*sqrt(2)); chk('angle D droit',(A6-D6).dot(B6-D6),0)
chk('aire totale cone', pi*36+pi*6*6*sqrt(2), 36*pi*(1+sqrt(2))); chk('volume cone', Rational(1,3)*pi*36*6, 72*pi); print('aire ~', (36*pi*(1+sqrt(2))).evalf(6), 'vol ~', (72*pi).evalf(6))

print('=== 2016 ===')
chk('A', Integer(12)**100*Rational(3,2)**50*Integer(6)**-149, 6); chk('B', sqrt(512)-3*sqrt(98)+sqrt(50), 0)
chk('E', (Integer(8)**10+4**10)/(Integer(8)**4+4**11), 256); chk('F', sqrt(2015*2016-2015), 2015)
chk('999999', 999999**2+2000**2-1000001**2, 0); chk('80001', 80001**2-160001, 80000**2); print('80000^2 =', 80000**2)
H=4*(x+sqrt(3))**2-4*sqrt(3)*(x+sqrt(3))+3; G=(2*x+sqrt(3))**2
chk('H dev', expand(H), 4*x**2+4*sqrt(3)*x+3); chk('G dev', expand(G), 4*x**2+4*sqrt(3)*x+3)
print('|2x+sqrt3|=2sqrt3', solve(Eq(Abs(2*x+sqrt(3)),2*sqrt(3)),x))
A7,B7,C7,D7=Matrix([0,0]),Matrix([2,0]),Matrix([2,2]),Matrix([0,2]); I7=(A7+B7)/2; J7=(B7+C7)/2
K7=Matrix([0,-1]); chk('K sur IJ', (K7-I7)[1]*(J7-I7)[0]-(K7-I7)[0]*(J7-I7)[1], 0)
chk('KA=BJ', (A7-K7).norm()-(J7-B7).norm(),0); chk('BJ=JC',(J7-B7).norm()-(C7-J7).norm(),0)
chk('AKBJ: AK=JB',(K7-A7-(B7-J7)).norm(),0); chk('AKJC: AK=CJ',(K7-A7-(J7-C7)).norm(),0)
chk('DB.KJ',(B7-D7).dot(J7-K7),0); chk('I orthocentre: KI.BD', (I7-K7).dot(D7-B7),0); chk('BI.DK',(I7-B7).dot(K7-D7),0); chk('DI.AJ',(I7-D7).dot(J7-A7),0)
# exercice 4 : vecteurs, triangle IJK quelconque
i1,i2,j1,j2,k1,k2=symbols('i1 i2 j1 j2 k1 k2'); Iv,Jv,Kv=Matrix([i1,i2]),Matrix([j1,j2]),Matrix([k1,k2])
Av=2*Jv-Kv; Bv=2*Kv-Iv; Cv=2*Iv-Jv
chk('AK=2/7(2AB+AC)', ((Kv-Av)-Rational(2,7)*(2*(Bv-Av)+(Cv-Av))).applyfunc(simplify).norm(), 0)

print('=== 2018 ===')
p,q=symbols('p q'); print('systeme', solve([p+q-6,3*p-q],[p,q]))
chk('aire AIB', Rational(1,2)*3*h/4, 3*h/8); chk('aire DIC', Rational(1,2)*9*3*h/4, 27*h/8); chk('rapport 9', (27*h/8)/(3*h/8), 9)
n=symbols('n'); chk('1/(x(x+1))', 1/x-1/(x+1), 1/(x*(x+1)))
chk('somme 5 termes', sum(Rational(1,k*(k+1)) for k in range(1,6)), Rational(5,6))
Hx=(x**2-4+(x+2)**2)/(x*(x+1)); chk('num fact', factor(x**2-4+(x+2)**2), 2*x*(x+2)); chk('H simpl', cancel(Hx), (2*x+4)/(x+1)); print('H=2x', solve(Eq(cancel(Hx),2*x),x))
chk('chomeurs 1 an', 2000000*Rational(99,100), 1980000); chk('5 ans', 2*10**6*Rational(961,1000), 1922000)

print('=== 2021 ===')
chk('AC', 4*sqrt(2)*sqrt(2), 8); chk('SH', sqrt((4*sqrt(5))**2-4**2), 8); chk('apotheme', sqrt((4*sqrt(5))**2-(2*sqrt(2))**2), 6*sqrt(2))
chk('v', Rational(1,3)*(4*sqrt(2))**2*8, Rational(256,3)); chk("v'", Rational(256,3)*Rational(1,4)**3, Rational(4,3))
chk('cos15', sqrt((1+sqrt(3)/2)/2), (sqrt(6)+sqrt(2))/4); chk('sin15', sqrt(1-((sqrt(6)+sqrt(2))/4)**2), (sqrt(6)-sqrt(2))/4)
al=symbols('alpha'); chk('cos^2(a/2)', (1+cos(al))/2, cos(al/2)**2)

print('=== 2019 ===')
print('systeme', solve([x-y-3,3*x-y-1],[x,y]))
chk('Delta perp D2', Rational(-1,3)*3, -1); chk('P sur Delta', 3+3*4-15, 0)
chk('milieu AB', Rational(-5+3,2), -1); chk('AB', 3-(-5), 8)
chk('cos15 depuis sin15', sqrt(1-((sqrt(6)-sqrt(2))/4)**2), (sqrt(6)+sqrt(2))/4)


print('=== 2016 (construction Ex4 Q4) ===')
a1,a2,b1,b2,c1,c2=symbols('a1 a2 b1 b2 c1 c2')
A,B,C=Matrix([a1,a2]),Matrix([b1,b2]),Matrix([c1,c2])
K=A+Rational(2,7)*(2*(B-A)+(C-A)); J=(A+K)/2; I=2*K-B
chk('I milieu de [CJ]', ((C+J)/2-I).applyfunc(simplify).norm(), 0)
chk('AK=(AB+AI)/2', ((K-A)-((B-A)+(I-A))/2).applyfunc(simplify).norm(), 0)
chk('AI=(AJ+AC)/2', ((I-A)-((J-A)+(C-A))/2).applyfunc(simplify).norm(), 0)
chk('AJ=AK/2', ((J-A)-(K-A)/2).applyfunc(simplify).norm(), 0)
P=B+(C-B)/3; chk('hypothese BP=BC/3 : AK=6/7 AP', ((K-A)-Rational(6,7)*(P-A)).applyfunc(simplify).norm(), 0)

print('\nBILAN :', sum(ok), '/', len(ok), 'vérifications OK')
