import { z } from "zod";

export const companionSchema = z.object({
  name: z.string().trim().min(1, "Falta el nombre del acompañante"),
  menuType: z.enum(["normal", "infantil"]),
  allergies: z.string().trim().max(500).optional().default(""),
});

export const rsvpSchema = z.object({
  guestName: z.string().trim().min(1, "El nombre es obligatorio"),
  attending: z.boolean(),
  guestMenuType: z.enum(["normal", "infantil"]).optional(),
  guestAllergies: z.string().trim().max(500).optional().default(""),
  companions: z.array(companionSchema).max(15).default([]),
  busOutbound: z.boolean().default(false),
  busReturn: z.boolean().default(false),
  busReturnTripId: z.string().optional(),
  needsHotel: z.boolean().default(false),
  hotelGuestsCount: z.number().int().min(0).max(20).default(0),
  specialNeeds: z.string().trim().max(500).optional().default(""),
  privacyConsent: z.literal(true, {
    error: "Debes aceptar el aviso de privacidad para poder enviar el formulario",
  }),
  // Campo honeypot anti-spam: debe llegar vacío en un envío legítimo.
  website: z.string().max(0).optional().default(""),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
export type CompanionInput = z.infer<typeof companionSchema>;
