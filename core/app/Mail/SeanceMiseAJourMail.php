<?php

namespace App\Mail;

use App\Models\Seance;
use App\Models\SessionFormationEntreprise;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SeanceMiseAJourMail extends Mailable
{
    use Queueable, SerializesModels;

    public $seance;
    public $session;
    public $participant;
    public $planningUrl;

    /**
     * Create a new message instance.
     */
    public function __construct(Seance $seance, SessionFormationEntreprise $session, User $participant)
    {
        $this->seance = $seance;
        $this->session = $session;
        $this->participant = $participant;
        $this->planningUrl = config('app.frontend_url') . '/api/login'; 
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Modification concernant votre séance de formation',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.modification',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
