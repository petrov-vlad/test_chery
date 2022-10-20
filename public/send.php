<?php

require_once "vendor/autoload.php";

use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mime\Email;

// отправки писем на тестовый адрес
$test_mode = false;

$_POST = json_decode(file_get_contents('php://input'), true);

$config = array(
    "domain" => "chery42.ru",
    "email"  => "in@chery42.ru",
    "name"   => "name",
    "phone"   => "phone",
    "type"   => "type",
    "model"   => "model",
    "target"   => "target",
);

if ($test_mode) {
    $to = 'a.butkevich@tapir.ws';
} else {
    $to = $config['email'];
}

$subject = 'Тема: Новая заявка с ' . $config['domain'];
$message = '
        <html>
            <head>
                <title>' . $subject . '</title>
            </head>
            <body>
                <p>Имя: ' . $_POST['name'] . '</p>
                <p>Телефон: ' . $_POST['phone'] . '</p>
                <p>Тип обращения: ' . $_POST['type'] . '</p>
                <p>Модель: ' . $_POST['model'] . '</p>
                <p>Цель обращения: ' . $_POST['target'] . '</p>
            </body>
        </html>';

$transport = Transport::fromDsn('smtp://robot@chery42.ru:R0b0t0741@mail.chery42.ru:587?verify_peer=0');
$mailer = new Mailer($transport);

$email = (new Email())
    ->from('robot@chery42.ru')
    ->to($to)
    ->subject($subject)
    ->html($message);

try {
    $mailer->send($email);
    echo ('Success');
} catch (\Exception $e) {
    echo ('Error');
}
