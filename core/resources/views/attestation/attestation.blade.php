<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Certificate</title>
    <style>
        @page {
            size: A4 landscape; /* format paysage */
            margin: 0;
        }

        html, body {
            margin: 0;
            padding: 0;
            font-family: 'DejaVu Sans', sans-serif;
            text-align: center;
            position: relative;
            height: 100%;
        }

        .background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover; 
            z-index: -1;
        }

        .content {
            position: relative;
            z-index: 2;
            padding: 50px 50px 50px 50px;
        }

        .title {
            font-size: 40px;
            font-weight: bold;
            color: #0a1a3b;
            margin: 0;
        }

        .subtitle {
            font-size: 28px;
            font-weight: bold;
            color: #c1922e;
            margin: 10px 0;
        }

        .presented {
            font-size: 16px;
            color: #555;
            margin-top: 20px;
        }

        .name {
            font-family: 'Brush Script MT', cursive;
            font-size: 38px;
            margin: 30px 0;
        }

        .description {
            font-size: 14px;
            color: #444;
            margin: 80px auto;
            max-width: 600px;
        }

        .platforme {
            margin-top: 80px;
            font-size: 16px;
            font-weight: bold;
        }
        .signature{
            margin-top: 4px;
            font-size: 16px;
            font-weight: bold;
        }
        img {
            width:100px;
        }
    </style>
</head>
<body>
    <img src="{{ public_path('images/bg3.png') }}" class="background" alt="Background">

    <div class="content">
        <img src="{{ public_path('images/logo.png') }}" alt="logo">
        <h1 class="title">ATTESTATION</h1>
        <h2 class="subtitle">DE FORMATION</h2>
        <p class="presented">Nous, soussignés:</p>
        <h2 class="name">{{ $name }}</h2>
        <p class="description">
            a suivi la formation intitulée {{$formation}}, dispensée du {{$date_debut}} au {{$date_fin}} 
            avec plenitude education. Cette formation a été réalisée avec succès, conformément au programme prévu. Fait à fès, le {{$date}}.
        </p>
        <p class="platforme">Plenitude Education</p>
        <p class="signature">signature</p>
    </div>
</body>
</html>
