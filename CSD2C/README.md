# CSD2C
Eindopdracht van Bas de Bruin en Ruben Middelman.

## Conceptbeschrijving

Wij hebben voor dit project gekozen voor een draadloze aansturing van effecten via mobiele telefoon. De uitvoering hiervan is geïnspireerd door de KORG KAOSS PAD effect-dozen.
Een computer of raspberry pi host een web app die je kan openen op je telefoon. Hierop krijg je een XY pad en een aantal knoppen te zien waarmee je kan wisselen tussen effecten.
De data van de telefoon wordt via OSC naar een C++ script gestuurd die de effecten, realtime op de inkomende audio uitvoert.
De effect keuze is ook geïnspireerd door de KAOSS pad en bestaat uit de keuze tussen: een lowpass filter, bandpass filter en tremolo.
Voor de UI van de webapp is een combinatie van p5.js en html elementen gebruikt.

## Systeemdiagram

![](docs/SysteemDiagram.jpg)

## Audio Flow Diagram

![](docs/AudioFlowDiagram.jpg)
#### mapping:
* Low Pass Filter - x: cutoff y: volume
* Band Pass Filter - x: cutoff y: volume
* Tremolo - x: speed y: volume

## Reflectie

#### Bas
Naar mijn mening ging dit project redelijk goed. We zijn tegen wat problemen gelopen maar die hebben we ook opgelost.
Mijn samenwerking met Ruben ging goed, we hebben een duidelijke taakverdeling gemaakt en het werkt eerlijk verdeeld, ik had met meer op het low-pass filter, webapp en documentatie gericht en Ruben op de osc en audio processing code.

Als enige kritiek aan dit project heb ik dat ik een beetje teleurgesteld was is de hoeveelheid vrijheid die we kregen. Het voelde nog erg als een school opdracht waar je een idee moet verzinnen om de eisen van de opdracht heen. Ons project was dan ook een beetje een idee voor een app wat we om hebben gevormt naar de eisen. Desalnietemin was het een leerzame ervaring en ben ik tevreden met het eindresultaat.

#### Ruben
In het begin van dit project was ik heel erg excited om dit project te gaan doen wij hadden er heel erg zin in jet het concept was leuk. naar maten van tijd liepen we steeds meer tegen probelemen aan waar wij zelf echt niet goed wisten wat we er mee moesten doen. dingen zoals jack begon steeds irritanter te worden en dingen als filters bouwen wat wij erg graag wouden doen wou ook maar niet lukken terwijl we volgens pieter al best wel ver zouden kunnen komen. gelukkig kwamen bas en ik met onze samenwerking er goed uit. maar door al de dingen die nog niet volledig lukten begonnen wij dit project meer als een goeie proof of concept gezien dan een volwaardig product dus wij zouden graag nog door willen gaan maar dan zonder limieten zodat wij in alle vrijheid kunnen doen wat we willen.

## Tijdsbesteding

#### Bas
* 20 uur - Webapp code
* 5 uur - Low-pass filter
* 5 uur - Documentatie
* 5 uur - Demovideo + editing

#### Ruben
* 2 -concept uitwerken
* 10 - bandpass filter research
* 2 - bandpass filter aanpassen
* 4 - tremelo
* 6 - OSC aansluiten
* 2 - node js
* 4 - samenvoegen OSC en audio
* 15 - research audio effecten (boek lezen)
