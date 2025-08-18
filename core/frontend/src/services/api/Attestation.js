import { axiosUser } from "@/components/api/axios";

const AttestationApi = {
  attestation: async (userId, sessionId, config = {}) => {
    return await axiosUser.get(`/api/attestation/${userId}`, {
      params: { session_id: sessionId },
      ...config,
      responseType: "blob", // important pour les fichiers
    });
  },
};

export default AttestationApi;

// handler principal
export const handleAttestation = async (
  userId,
  sessionId,
  setDownloadingAttestationId,
  toast
) => {
  try {
    setDownloadingAttestationId(sessionId);

    const response = await AttestationApi.attestation(userId, sessionId);

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `attestation_${userId}_${new Date().toISOString().split("T")[0]}.pdf`
    );
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);

    toast.success("Attestation téléchargée avec succès");
  } catch (error) {
    toast.error("Erreur lors du téléchargement de l'attestation");
    console.error("Erreur téléchargement attestation:", error);
  } finally {
    setDownloadingAttestationId(null);
  }
};
