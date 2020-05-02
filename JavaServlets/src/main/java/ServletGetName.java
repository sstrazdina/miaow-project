import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ServletGetName extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter pw = response.getWriter();
        String name = request.getParameter("name");
        if(name.length() <= 100) {
            pw.println("<a>Name is " + name + "</a>");
        }
        else pw.println("<a>Parameter length must be no more that 100</a>");
    }
}
