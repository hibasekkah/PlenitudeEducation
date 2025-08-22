<!DOCTYPE html>
<html>
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;600&family=Ubuntu:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: "Ubuntu", sans-serif;
            margin: 20px;
            line-height: 1.5;
            color: #333;
        }

        .header {
            display: flex;
            align-items: center;
            margin-bottom: 25px;
        }

        .header img {
            margin-right: 15px;
        }

        h2 {
            font-family: "Jost", sans-serif;
            color: #497DDC;
            margin: 0;
            font-weight: 600;
            font-size: 1.5rem;
        }

        p {
            margin-bottom: 20px;
            font-size: 14px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
        }

        th, td {
            border: 1px solid #ddd;
            text-align: left;
            padding: 8px 10px;
        }

        th {
            background-color: #f0f4ff;
            font-weight: 600;
            color: #222;
        }

        tr:nth-child(even) {
            background-color: #fafafa;
        }

        tr:hover {
            background-color: #f5faff;
        }
    </style>
</head>
<body>

<div class="header">
    <img 
        src="{{ public_path('images/logo.png') }}"
        alt="Plenitude Education Logo" 
        width="60"               
    />
    <h2>Plenitude Education</h2>
</div>

<p>Liste des participants inscrits à la formation : <strong>{{ $formation }}</strong></p>

<table>
    <thead>
        <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Fonction</th>
            <th>Statut</th>
        </tr>
    </thead>
    <tbody>
        @foreach($data as $row)
        <tr>
            <td>{{ $row["nom"] }}</td>
            <td>{{ $row["prenom"] }}</td>
            <td>{{ $row["email"] }}</td>
            <td>{{ $row["telephone"] }}</td>
            <td>{{ $row["fonction"] }}</td>
            <td>{{ $row["statut"] }}</td>
        </tr>
        @endforeach
    </tbody>
</table>

</body>
</html>
