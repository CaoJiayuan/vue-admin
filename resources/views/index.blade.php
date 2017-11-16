<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Admin</title>
    <link rel="stylesheet" href="/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="/css/app.css">
    <link rel="stylesheet" href="/css/skins/_all-skins.min.css">
</head>
<body class="hold-transition skin-blue-light sidebar-mini">
<div id="app" class="wrapper">
    <admin-header></admin-header>
    <admin-aside></admin-aside>
    <admin-content></admin-content>
    <admin-footer></admin-footer>
</div>
</body>
<script src="/js/manifest.js"></script>
<script src="/js/vendor.js"></script>
<script src="/js/app.js"></script>
</html>