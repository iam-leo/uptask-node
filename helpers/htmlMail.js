export const htmlEmail = (href) => {
    const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; text-align: center; margin: 0; padding: 0; background-color: #f4f4f4;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: auto;">
            <tr>
                <td style="padding: 20px;">
                    <h1 style="font-size: 40px; margin-bottom: 20px;">Reestablecer contraseña</h1>
                    <p style="font-size: 24px; margin-bottom: 20px;">Si has solicitado reestablecer tu contraseña, haz clic en el siguiente botón. En caso contrario, ignora este correo.</p>
                    <a href="${href}" style="display: inline-block; padding: 10px 14px; font-size: 24px; text-transform: uppercase; background: blue; border: none; border-radius: 8px; color: white; text-decoration: none; margin-bottom: 20px;">Cambiar contraseña</a>
                    <p style="font-size: 24px;">UpTask 2023</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
`
    return html;
}