import { useEffect, useState, useRef, useCallback } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, Download, Share2 } from 'lucide-react';

interface ShareModalProps {
  url: string;
  profileName: string;
  onClose: () => void;
}

export function ShareModal({ url, profileName, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [qrSvg, setQrSvg] = useState<string>('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    QRCode.toDataURL(url, { width: 240, margin: 2, color: { dark: '#000000', light: '#ffffff' } })
      .then(setQrDataUrl)
      .catch(() => {});
    QRCode.toString(url, { type: 'svg', margin: 2, color: { dark: '#000000', light: '#ffffff' } })
      .then(setQrSvg)
      .catch(() => {});
  }, [url]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    closeBtnRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  const handleDownload = useCallback(() => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `${profileName.toLowerCase().replace(/\s+/g, '-')}-qr.png`;
    a.click();
  }, [qrDataUrl, profileName]);

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `${profileName} — dotlnk`, url });
      } catch { /* user cancelled */ }
    } else {
      handleCopy();
    }
  }, [profileName, url, handleCopy]);

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Share ${profileName}'s profile`}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm lf-anim-fade-in"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className="relative w-full max-w-sm overflow-hidden rounded-2xl lf-anim-scale-in"
        style={{
          background: 'var(--lf-bg-alt, var(--lf-bg))',
          border: '1px solid var(--lf-border)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: 'var(--lf-border)' }}>
          <h2 className="text-base font-semibold" style={{ color: 'var(--lf-text-heading)', fontFamily: 'var(--lf-font-heading)' }}>
            Share profile
          </h2>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close share dialog"
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[var(--lf-card)]"
            style={{ color: 'var(--lf-text-muted)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* QR code */}
        <div className="flex flex-col items-center px-5 py-6">
          <div className="rounded-xl bg-white p-3" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
            {qrDataUrl ? (
              <img src={qrDataUrl} alt={`QR code for ${url}`} className="h-44 w-44" />
            ) : (
              <div className="h-44 w-44 animate-pulse rounded bg-gray-200" />
            )}
          </div>

          {/* URL */}
          <div className="mt-5 flex w-full items-center gap-2 rounded-lg px-3 py-2.5" style={{ background: 'var(--lf-card)' }}>
            <span className="flex-1 truncate text-xs" style={{ color: 'var(--lf-text-muted)', fontFamily: 'var(--lf-font-mono)' }}>
              {url}
            </span>
            <button
              onClick={handleCopy}
              aria-label={copied ? 'URL copied' : 'Copy URL'}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md transition-all hover:scale-105"
              style={{ background: copied ? 'var(--lf-accent)' : 'var(--lf-accent-soft)', color: copied ? '#fff' : 'var(--lf-accent)' }}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>
          </div>

          {copied && (
            <p className="mt-2 text-xs lf-anim-fade-in" style={{ color: 'var(--lf-accent)' }}>
              Copied to clipboard
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2.5 border-t px-5 py-4" style={{ borderColor: 'var(--lf-border)' }}>
          <button
            onClick={handleDownload}
            disabled={!qrDataUrl}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
            style={{ background: 'var(--lf-accent-soft)', color: 'var(--lf-accent)' }}
          >
            <Download size={15} />
            Download QR
          </button>
          {hasNativeShare ? (
            <button
              onClick={handleNativeShare}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
              style={{ background: 'var(--lf-accent)', color: '#fff' }}
            >
              <Share2 size={15} />
              Share
            </button>
          ) : (
            <button
              onClick={handleCopy}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
              style={{ background: 'var(--lf-accent)', color: '#fff' }}
            >
              <Copy size={15} />
              Copy URL
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


