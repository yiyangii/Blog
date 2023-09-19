import com.mercury.BlogSystemMessage.bean.BlogDirectMessage;
import com.mercury.BlogSystemMessage.service.MessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    @Autowired
    private MessageService messageService;  // 你的消息服务

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // 用于发送消息的接口
    @MessageMapping("/sendMessage")
    public void sendMessage(@Payload BlogDirectMessage message) {
        try {
            // 使用你的MessageService的sendMessage方法来保存消息
            BlogDirectMessage savedMessage = messageService.sendMessage(message, message.getTransientConversationId());

            if (savedMessage != null) {
                // 使用SimpMessagingTemplate将消息发送给接收者
                messagingTemplate.convertAndSendToUser(
                        String.valueOf(savedMessage.getReceiverId()),
                        "/topic/messages",
                        savedMessage);
            }
        } catch (Exception e) {
            logger.error("Failed to send message", e);
        }
    }
}
