import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const paradiseSwal = Swal.mixin({
    background: "#0f172a",
    color: "#e2e8f0",
    customClass: {
        popup:         "paradise-swal-popup",
        confirmButton: "paradise-swal-confirm",
        cancelButton:  "paradise-swal-cancel",
    },
    buttonsStyling: false,
});

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        paradiseSwal.fire({
            /* ── Confirm step ── */
            html: `
                <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;padding:0.5rem 0">
                    <div style="
                        width:64px;height:64px;border-radius:18px;
                        background:linear-gradient(135deg,#0d9488,#0e7490);
                        display:flex;align-items:center;justify-content:center;
                        font-size:1.75rem;color:#fff;
                        box-shadow:0 8px 24px rgba(13,148,136,0.45);">
                        <i class='fa-solid fa-plane-departure'></i>
                    </div>
                    <h2 style="font-size:1.25rem;font-weight:700;color:#f0fdfa;margin:1">Sign Out?</h2>
                    <p style="font-size:0.85rem;color:#94a3b8;margin:0">You will be redirected to the login page.</p>
                </div>`,
            showCancelButton: true,
            confirmButtonText: '<i class="fa-solid fa-right-from-bracket"></i> &nbsp;Yes, Logout',
            cancelButtonText:  '<i class="fa-solid fa-xmark"></i> &nbsp;Cancel',
            width: 360,
            padding: "1.75rem",
        }).then((result) => {
            if (result.isConfirmed) {
                /* ── Farewell popup (matches login success style exactly) ── */
                paradiseSwal.fire({
                    html: `
                        <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;padding:0.5rem 0">
                            <div style="
                                width:64px;height:64px;border-radius:18px;
                                background:linear-gradient(135deg,#0d9488,#0e7490);
                                display:flex;align-items:center;justify-content:center;
                                font-size:1.75rem;color:#fff;
                                box-shadow:0 8px 24px rgba(13,148,136,0.45);">
                                <i class='fa-solid fa-plane-departure'></i>
                            </div>
                            <h2 style="font-size:1.25rem;font-weight:700;color:#f0fdfa;margin:0">Goodbye, Agent!</h2>
                            <p style="font-size:0.85rem;color:#94a3b8;margin:0">Signing you out safely…</p>
                        </div>`,
                    showConfirmButton: false,
                    timer: 1800,
                    timerProgressBar: true,
                    width: 360,
                    padding: "1.75rem",
                    showClass: { popup: "animate__animated animate__fadeInDown animate__faster" },
                    hideClass: { popup: "animate__animated animate__fadeOutUp animate__faster" },
                    didOpen: () => {
                        const bar = Swal.getTimerProgressBar();
                        if (bar) {
                            bar.style.background = "linear-gradient(90deg,#0d9488,#2dd4bf)";
                            bar.style.height = "3px";
                        }
                    },
                }).then(() => {
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("userName");
                    sessionStorage.removeItem("agentID");
                    localStorage.removeItem("agentID");
                    window.location.href = "/login";
                });
            } else {
                navigate(-1);
            }
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return null;
}

export default Logout;

