<!DOCTYPE html>
<html>
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: "Ubuntu", sans-serif;
            margin: 30px;
            color: #333;
            line-height: 1.6;
        }

        /* Header */
        .header {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }

        .header img {
            margin-right: 15px;
        }

        .header h2 {
            color: #497DDC;
            font-weight: 600;
            margin: 0;
        }

        hr {
            border: none;
            border-top: 2px solid #497DDC;
            margin: 15px 0 25px 0;
        }

        /* Texte d’intro */
        p {
            margin: 8px 0;
        }

        .highlight {
            font-weight: 500;
            color: #497DDC;
        }

        /* Tableau */
        table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            font-size: 14px;
            margin-top: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.08);
        }

        th, td {
            padding: 10px 12px;
            text-align: left;
        }

        th {
            background-color: #497DDC;
            color: white;
            font-weight: 500;
        }

        tr:nth-child(even) td {
            background-color: #f9f9f9;
        }

        tr:hover td {
            background-color: #eef3ff;
        }

        /* Bordures arrondies */
        table tr:first-child th:first-child {
            border-top-left-radius: 8px;
        }
        table tr:first-child th:last-child {
            border-top-right-radius: 8px;
        }
        table tr:last-child td:first-child {
            border-bottom-left-radius: 8px;
        }
        table tr:last-child td:last-child {
            border-bottom-right-radius: 8px;
        }
    </style>
</head>
<body>

<div class="header">
    <img src="{{ public_path('images/logo.png') }}" alt="Plenitude Education Logo" width="60" />
    <h2>Plenitude Education</h2>
</div>
<hr>

<p><span class="highlight">Formation :</span> {{$formation}}</p>
<p><span class="highlight">Séance :</span> {{\Carbon\Carbon::parse($date)->format('d-m-Y')}} — de {{\Carbon\Carbon::parse($heure_debut)->format('H:i')}} à {{\Carbon\Carbon::parse($heure_fin)->format('H:i')}}</p>
<p><span class="highlight">Module/Atelier :</span> {{$module ? $module : $atelier}}</p>

<table>
    <tr>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Email</th>
        <th>Téléphone</th>
        <th>Présence</th>
    </tr>
    
    @foreach($data as $row)
    <tr>
        <td>{{$row["nom"]}}</td>
        <td>{{$row["prenom"]}}</td>
        <td>{{$row["email"]}}</td>
        <td>{{$row["telephone"]}}</td>
        <td>{{$row["presence"]}}</td>
    </tr>
    @endforeach
</table>

</body>
</html>
